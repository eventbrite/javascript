import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import isEmpty from 'lodash/isEmpty';
import gettext from 'js-utils/gettext';

import BankGraphicSvg from 'eventbrite_design_system/iconography/icons/BankGraphic';
import DataTable from 'eventbrite_design_system/dataTable/DataTable';
import Dialog from 'eventbrite_design_system/dialog/Dialog';
import EmptyState from 'eventbrite_design_system/emptyState/EmptyState';
import Modal from 'eventbrite_design_system/modal/Modal';
import Pagination from 'eventbrite_design_system/pagination/Pagination';
import SelectField from 'eventbrite_design_system/inputField/SelectField';

import {
    ACCOUNT_SETTINGS_LIST_COLUMNS as columns,
    DELETION_ALLOWED,
    DELETION_EVENT_ASSOCIATED,
    DELETION_API_ERROR_ASSOCIATED,
    UPDATE_PAYMENT_INSTRUMENT_MODAL,
    FORM_FROM_INSTRUMENT_TYPE,
} from '../constants';
import {
    EMPTY_STATE_MESSAGE,
    INSTRUMENT_TYPES_VALUE_DISPLAY,
    INSTRUMENT_TYPES_NON_EPP_VALUE_DISPLAY,
    PAYMENT_INSTRUMENT_PAGINATION,
    VIEW_TYPE_LABEL,
    MODAL_UPDATE_TITLE_PAYMENT_INSTRUMENT,
} from '../constants/financialProfile';
import {
    PAYMENT_INSTRUMENTS_LIST_PROPS,
    EVENT_LIST_PROPS,
    API_ERROR_HANDLING_PROPS,
} from '../constants/proptypes';

import EventsModal from './EventsModal';
import { itemPaymentInstrument } from './financialProfileUtils/PaymentInstrument';
import PaypalForm from './financialProfileUtils/PaypalForm';
import AuthnetForm from './financialProfileUtils/AuthnetForm';
import InProgressDialog from './financialProfileUtils/InProgressDialog';

function InstrumentFilter({ onFilterChange, filterValues, filterValue }) {
    return (
        <div className="eds-g-cell eds-g-cell-3-12 eds-align--left eds-l-mar-top-10">
            <SelectField
                onChange={props.onFilterChange}
                name="instrumentTypes"
                label={VIEW_TYPE_LABEL}
                values={filterValues}
                value={filterValue}
            />
        </div>
    );
}

function PaymentInstrumentTable({ items }) {
    return (
        <div className="eds-g-cell eds-g-cell-1-1">
            <DataTable items={items} columns={columns} />
        </div>
    );
}

export default class PayoutMethodSummary extends PureComponent {
    static propTypes = {
        handlePageChange: PropTypes.func,
        handleDeleteInstrument: PropTypes.func,
        paymentInstruments: PAYMENT_INSTRUMENTS_LIST_PROPS,
        isEventsModalOpen: PropTypes.bool,
        showEventsModal: PropTypes.func,
        hideEventsModal: PropTypes.func,
        getEvents: PropTypes.func,
        eventList: EVENT_LIST_PROPS,
        eventId: PropTypes.string,
        instrumentTypes: PropTypes.string,
        isInstrumentTypeFilterActive: PropTypes.bool,
        onChange: PropTypes.func,
        onClose: PropTypes.func,
        apiHandledErrors: API_ERROR_HANDLING_PROPS,
        onUpdateModalSubmit: PropTypes.func,
        updatePaymentInstrument: PropTypes.func,
        setVaultIdToDelete: PropTypes.func,
        isUpdateIntrumentModalOpen: PropTypes.bool,
        showUpdateInstrumentModal: PropTypes.func,
        hideUpdateInstrumentModal: PropTypes.func,
        isTryAgainModalOpen: PropTypes.bool,
        hideTryAgainModal: PropTypes.func,
        isInProgressDialogOpen: PropTypes.bool,
        hideInProgressDialog: PropTypes.func,
        canListPayoutUserInstruments: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            isDeletionAssociatedEventDialogShown: false,
            isDeletionEmptyListDialogShown: false,
            isDeletionAllowedDialogShown: false,
            eventIds: [],
            bankName: '',
            filterValue: _.first(INSTRUMENT_TYPES_VALUE_DISPLAY).value,
            modalUpdateTitle: '',
            modalUpdateChildren: '',
        };
    }

    componentDidUpdate = () => {
        /* ... */
    };

    _handlePageChange = page => {
        /* ... */
    };

    _getAccountSettingsItems = userInstruments => {
        /* ... */
    };

    _getModalUpdateContent = ({ payeeEmail, instrumentType }, vaultId) => {
        /* ... */
    };

    _handleItemAction = (vaultId, instrument, instrumentTitle, action) => {
        /* ... */
    };

    _handleDialogError = () => {
        /* ... */
    };

    _handleFilter = (value, index) => {
        /* ... */
    };

    _handleClose = () => {
        /* ... */
    };

    _handleClickUpdatePaymentInstrument = () => {
        /* ... */
    };

    _handleViewEventsOnDeletion = () => {
        /* ... */
    };

    _handleDeletion = () => {
        /* ... */
    };

    render = () => {
        const {
            eventList = [],
            hideEventsModal,
            showEventsModal,
            isInstrumentTypeFilterActive = false,
            apiHandledErrors = null,
            getEvents,
            isEventsModalOpen = false,
            paymentInstruments: {
                userInstruments,
                pagination: {
                    pageCount = PAYMENT_INSTRUMENT_PAGINATION.PAGE_SIZE,
                    pageNumber = PAYMENT_INSTRUMENT_PAGINATION.DEFAULT_PAGE,
                } = {},
            } = {},
            isUpdateIntrumentModalOpen,
            hideUpdateInstrumentModal,
            isInProgressDialogOpen,
            hideInProgressDialog,
            canListPayoutUserInstruments,
        } = this.props;

        const {
            isDeletionAssociatedEventDialogShown,
            isDeletionEmptyListDialogShown,
            isDeletionAllowedDialogShown,
            modalUpdateTitle,
            modalUpdateChildren,
        } = this.state;

        const paymentInstrumentsItems = this._getAccountSettingsItems(
            userInstruments,
        );
        let emptyState = null;
        let bottomText = null;
        let pagination = null;
        let filterPrimaryText = null;
        let filter = null;
        let paymentInstrumentTable = null;
        let eventsModal = null;
        let errorDialog = null;
        let paymentInstrumentModalsAndDialogs = null;
        let filterValues = INSTRUMENT_TYPES_VALUE_DISPLAY;

        if (!canListPayoutUserInstruments) {
            filterValues = INSTRUMENT_TYPES_NON_EPP_VALUE_DISPLAY;
        }
        filter = (
            <InstrumentFilter
                onFilterChange={this._handleFilter}
                filterValue={this.state.filterValue}
                filterValues={filterValues}
            />
        );
        paymentInstrumentTable = (
            <PaymentInstrumentTable items={paymentInstrumentsItems} />
        );
        if (isEmpty(paymentInstrumentsItems)) {
            if (isInstrumentTypeFilterActive) {
                filterPrimaryText = gettext('Remove filter');
            } else {
                paymentInstrumentTable = null;
            }
            emptyState = (
                <div className="eds-g-cell eds-g-cell-1-1 eds-l-mar-top-16 eds-align--center">
                    <EmptyState
                        graphicType={<BankGraphicSvg />}
                        title={gettext('No payout methods')}
                        primaryText={filterPrimaryText}
                        onPrimaryAction={this._handleFilter}
                    />
                </div>
            );
        } else {
            pagination = (
                <div className="eds-g-cell eds-g-cell-1-1 eds-align--center">
                    <Pagination
                        pageNumber={pageNumber}
                        pageCount={pageCount}
                        size="small"
                        showOnSinglePage={false}
                        onSelected={this._handlePageChange.bind(this)}
                    />
                </div>
            );
            bottomText = (
                <div className="eds-g-cell eds-align--left eds-text-bm eds-l-mar-top-4">
                    {EMPTY_STATE_MESSAGE}
                </div>
            );
            if (isEventsModalOpen) {
                eventsModal = (
                    <EventsModal
                        eventIds={this.state.eventIds}
                        bankName={this.state.bankName}
                        isShown={isEventsModalOpen}
                        showEventsModal={showEventsModal}
                        hideEventsModal={hideEventsModal}
                        getEvents={getEvents}
                        eventList={eventList}
                    />
                );
            }
            if (!isEmpty(apiHandledErrors)) {
                errorDialog = (
                    <Dialog
                        isShown={isDeletionEmptyListDialogShown}
                        message={apiHandledErrors.errors._error}
                        title={DELETION_API_ERROR_ASSOCIATED.title}
                        onClose={this._handleClose}
                        onPrimaryAction={this._handleClose}
                        primaryText={DELETION_API_ERROR_ASSOCIATED.primaryText}
                        primaryType="link"
                        onClickOutside={this._handleClose}
                    />
                );
            }
        }
        paymentInstrumentModalsAndDialogs = (
            <div>
                <Dialog
                    isShown={isDeletionAllowedDialogShown}
                    message={DELETION_ALLOWED.message}
                    title={DELETION_ALLOWED.title}
                    onClose={this._handleClose}
                    onSecondaryAction={this._handleClose}
                    secondaryText={DELETION_ALLOWED.secondaryText}
                    secondaryType="link"
                    onPrimaryAction={this._handleDeletion}
                    primaryText={DELETION_ALLOWED.primaryText}
                    primaryType="link"
                    onClickOutside={this._handleClose}
                />
                <Dialog
                    isShown={isDeletionAssociatedEventDialogShown}
                    message={DELETION_EVENT_ASSOCIATED.message}
                    title={DELETION_EVENT_ASSOCIATED.title}
                    onClose={this._handleClose}
                    onSecondaryAction={this._handleViewEventsOnDeletion}
                    secondaryText={DELETION_EVENT_ASSOCIATED.secondaryText}
                    secondaryType="link"
                    onPrimaryAction={this._handleClose}
                    primaryText={DELETION_EVENT_ASSOCIATED.primaryText}
                    primaryType="link"
                    onClickOutside={this._handleClose}
                />
                <Modal
                    isShown={isUpdateIntrumentModalOpen}
                    children={modalUpdateChildren}
                    title={modalUpdateTitle}
                    onClose={hideUpdateInstrumentModal}
                    onSecondaryAction={hideUpdateInstrumentModal}
                    secondaryText={
                        UPDATE_PAYMENT_INSTRUMENT_MODAL.secondaryText
                    }
                    secondaryType="neutral"
                    onPrimaryAction={this._handleClickUpdatePaymentInstrument}
                    primaryText={UPDATE_PAYMENT_INSTRUMENT_MODAL.primaryText}
                    primaryType="fill"
                    onClickOutside={hideUpdateInstrumentModal}
                />
                <InProgressDialog
                    isInProgressDialogOpen={isInProgressDialogOpen}
                    hideInProgressDialog={hideInProgressDialog}
                />
                {eventsModal}
                {errorDialog}
            </div>
        );

        return (
            <div>
                {paymentInstrumentModalsAndDialogs}
                {filter}
                <div className="eds-g-cell eds-g-cell-1-1 eds-align--left eds-l-mar-top-4">
                    {paymentInstrumentTable}
                    {emptyState}
                    {pagination}
                </div>
                {bottomText}
            </div>
        );
    };
}
