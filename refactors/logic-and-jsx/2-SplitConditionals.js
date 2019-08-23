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

import * as Constants from '../constants';
import * as FinancialProfileConstants from '../constants/financialProfile';
import * as AppPropTypes from '../constants/proptypes';

import EventsModal from './EventsModal';
import { itemPaymentInstrument } from './financialProfileUtils/PaymentInstrument';
import PaypalForm from './financialProfileUtils/PaypalForm';
import AuthnetForm from './financialProfileUtils/AuthnetForm';
import InProgressDialog from './financialProfileUtils/InProgressDialog';

function getPaginationSettings(res) {
    let pageCount =
        FinancialProfileConstants.PAYMENT_INSTRUMENT_PAGINATION.PAGE_SIZE;
    let pageNumber =
        FinancialProfileConstants.PAYMENT_INSTRUMENT_PAGINATION.DEFAULT_PAGE;

    if (res && res.pagination) {
        if (typeof res.pagination.pageCount !== 'undefined') {
            pageCount = res.pagination.pageCount;
        }
        if (typeof res.pagination.pageNumber !== 'undefined') {
            pageNumber = res.pagination.pageNumber;
        }
    }

    return { pageCount, pageNumber };
}

function InstrumentFilter(props) {
    return (
        <div className="eds-g-cell eds-g-cell-3-12 eds-align--left eds-l-mar-top-10">
            <SelectField
                onChange={props.onFilterChange}
                name="instrumentTypes"
                label={FinancialProfileConstants.VIEW_TYPE_LABEL}
                values={props.filterValues}
                value={props.filterValue}
            />
        </div>
    );
}

function PaymentInstrumentTable(props) {
    return (
        <div className="eds-g-cell eds-g-cell-1-1">
            <DataTable
                items={props.items}
                columns={Constants.ACCOUNT_SETTINGS_LIST_COLUMNS}
            />
        </div>
    );
}

export default class PayoutMethodSummary extends PureComponent {
    static propTypes = {
        handlePageChange: PropTypes.func,
        handleDeleteInstrument: PropTypes.func,
        paymentInstruments: AppPropTypes.PAYMENT_INSTRUMENTS_LIST_PROPS,
        isEventsModalOpen: PropTypes.bool,
        showEventsModal: PropTypes.func,
        hideEventsModal: PropTypes.func,
        getEvents: PropTypes.func,
        eventList: AppPropTypes.EVENT_LIST_PROPS,
        eventId: PropTypes.string,
        instrumentTypes: PropTypes.string,
        isInstrumentTypeFilterActive: PropTypes.bool,
        onChange: PropTypes.func,
        onClose: PropTypes.func,
        apiHandledErrors: AppPropTypes.API_ERROR_HANDLING_PROPS,
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

    static defaultProps = {
        eventList: [],
        isInstrumentTypeFilterActive: false,
        apiHandledErrors: null,
        isEventsModalOpen: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            isDeletionAssociatedEventDialogShown: false,
            isDeletionEmptyListDialogShown: false,
            isDeletionAllowedDialogShown: false,
            eventIds: [],
            bankName: '',
            filterValue: _.first(
                FinancialProfileConstants.INSTRUMENT_TYPES_VALUE_DISPLAY,
            ).value,
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
        let paginationSettings = getPaginationSettings(
            this.props.paymentInstruments,
        );

        let paymentInstrumentsItems = this._getAccountSettingsItems(
            this.props.paymentInstruments.userInstruments,
        );

        // --------------------------------------------------------------------

        let filterPrimaryText = null;

        if (
            isEmpty(paymentInstrumentsItems) &&
            this.props.isInstrumentTypeFilterActive
        ) {
            filterPrimaryText = gettext('Remove filter');
        }

        // --------------------------------------------------------------------

        let emptyState = null;

        if (isEmpty(paymentInstrumentsItems)) {
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
        }

        // --------------------------------------------------------------------

        let bottomText = null;

        if (!isEmpty(paymentInstrumentsItems)) {
            bottomText = (
                <div className="eds-g-cell eds-align--left eds-text-bm eds-l-mar-top-4">
                    {FinancialProfileConstants.EMPTY_STATE_MESSAGE}
                </div>
            );
        }

        // --------------------------------------------------------------------

        let pagination = null;

        if (!isEmpty(paymentInstrumentsItems)) {
            pagination = (
                <div className="eds-g-cell eds-g-cell-1-1 eds-align--center">
                    <Pagination
                        pageNumber={paginationSettings.pageNumber}
                        pageCount={paginationSettings.pageCount}
                        size="small"
                        showOnSinglePage={false}
                        onSelected={this._handlePageChange.bind(this)}
                    />
                </div>
            );
        }

        // --------------------------------------------------------------------

        let filterValues =
            FinancialProfileConstants.INSTRUMENT_TYPES_VALUE_DISPLAY;

        if (!this.props.canListPayoutUserInstruments) {
            filterValues =
                FinancialProfileConstants.INSTRUMENT_TYPES_NON_EPP_VALUE_DISPLAY;
        }

        // --------------------------------------------------------------------

        let filter = (
            <InstrumentFilter
                onFilterChange={this._handleFilter}
                filterValue={this.state.filterValue}
                filterValues={filterValues}
            />
        );

        // --------------------------------------------------------------------

        let paymentInstrumentTable = null;

        if (
            !isEmpty(paymentInstrumentsItems) ||
            this.props.isInstrumentTypeFilterActive
        ) {
            paymentInstrumentTable = (
                <PaymentInstrumentTable items={paymentInstrumentsItems} />
            );
        }

        // --------------------------------------------------------------------

        let eventsModal = null;

        if (!isEmpty(paymentInstrumentsItems) && this.props.isEventsModalOpen) {
            eventsModal = (
                <EventsModal
                    eventIds={this.state.eventIds}
                    bankName={this.state.bankName}
                    isShown={this.props.isEventsModalOpen}
                    showEventsModal={this.props.showEventsModal}
                    hideEventsModal={this.props.hideEventsModal}
                    getEvents={this.props.getEvents}
                    eventList={this.props.eventList}
                />
            );
        }

        // --------------------------------------------------------------------

        let errorDialog = null;

        if (
            !isEmpty(paymentInstrumentsItems) &&
            !isEmpty(this.props.apiHandledErrors)
        ) {
            errorDialog = (
                <Dialog
                    isShown={this.state.isDeletionEmptyListDialogShown}
                    message={this.props.apiHandledErrors.errors._error}
                    title={Constants.DELETION_API_ERROR_ASSOCIATED.title}
                    onClose={this._handleClose}
                    onPrimaryAction={this._handleClose}
                    primaryText={
                        Constants.DELETION_API_ERROR_ASSOCIATED.primaryText
                    }
                    primaryType="link"
                    onClickOutside={this._handleClose}
                />
            );
        }

        // --------------------------------------------------------------------

        let paymentInstrumentModalsAndDialogs = (
            <div>
                <Dialog
                    isShown={this.state.isDeletionAllowedDialogShown}
                    message={Constants.DELETION_ALLOWED.message}
                    title={Constants.DELETION_ALLOWED.title}
                    onClose={this._handleClose}
                    onSecondaryAction={this._handleClose}
                    secondaryText={Constants.DELETION_ALLOWED.secondaryText}
                    secondaryType="link"
                    onPrimaryAction={this._handleDeletion}
                    primaryText={Constants.DELETION_ALLOWED.primaryText}
                    primaryType="link"
                    onClickOutside={this._handleClose}
                />
                <Dialog
                    isShown={this.state.isDeletionAssociatedEventDialogShown}
                    message={Constants.DELETION_EVENT_ASSOCIATED.message}
                    title={Constants.DELETION_EVENT_ASSOCIATED.title}
                    onClose={this._handleClose}
                    onSecondaryAction={this._handleViewEventsOnDeletion}
                    secondaryText={
                        Constants.DELETION_EVENT_ASSOCIATED.secondaryText
                    }
                    secondaryType="link"
                    onPrimaryAction={this._handleClose}
                    primaryText={
                        Constants.DELETION_EVENT_ASSOCIATED.primaryText
                    }
                    primaryType="link"
                    onClickOutside={this._handleClose}
                />
                <Modal
                    isShown={this.props.isUpdateIntrumentModalOpen}
                    children={this.state.modalUpdateChildren}
                    title={this.state.modalUpdateTitle}
                    onClose={this.props.hideUpdateInstrumentModal}
                    onSecondaryAction={this.props.hideUpdateInstrumentModal}
                    secondaryText={
                        Constants.UPDATE_PAYMENT_INSTRUMENT_MODAL.secondaryText
                    }
                    secondaryType="neutral"
                    onPrimaryAction={this._handleClickUpdatePaymentInstrument}
                    primaryText={
                        Constants.UPDATE_PAYMENT_INSTRUMENT_MODAL.primaryText
                    }
                    primaryType="fill"
                    onClickOutside={this.props.hideUpdateInstrumentModal}
                />
                <InProgressDialog
                    isInProgressDialogOpen={this.props.isInProgressDialogOpen}
                    hideInProgressDialog={this.props.hideInProgressDialog}
                />
                {eventsModal}
                {errorDialog}
            </div>
        );

        // --------------------------------------------------------------------

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
