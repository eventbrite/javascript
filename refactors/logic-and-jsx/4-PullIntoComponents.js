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

function DeletionAllowedDialog(props) {
    return (
        <Dialog
            isShown={props.isShown}
            message={Constants.DELETION_ALLOWED.message}
            title={Constants.DELETION_ALLOWED.title}
            onClose={props.onClose}
            onSecondaryAction={props.onClose}
            secondaryText={Constants.DELETION_ALLOWED.secondaryText}
            secondaryType="link"
            onPrimaryAction={props.onDeletion}
            primaryText={Constants.DELETION_ALLOWED.primaryText}
            primaryType="link"
            onClickOutside={props.onClose}
        />
    );
}

function DeletionAssociatedEventDialog(props) {
    return (
        <Dialog
            isShown={props.isShown}
            message={Constants.DELETION_EVENT_ASSOCIATED.message}
            title={Constants.DELETION_EVENT_ASSOCIATED.title}
            onClose={props.onClose}
            onSecondaryAction={props.onViewEventsOnDeletion}
            secondaryText={Constants.DELETION_EVENT_ASSOCIATED.secondaryText}
            secondaryType="link"
            onPrimaryAction={props.onClose}
            primaryText={Constants.DELETION_EVENT_ASSOCIATED.primaryText}
            primaryType="link"
            onClickOutside={props.onClose}
        />
    );
}

function UpdateInstrumentModal(props) {
    return (
        <Modal
            isShown={props.isShown}
            children={props.children}
            title={props.title}
            onClose={props.onClose}
            onSecondaryAction={props.onClose}
            secondaryText={
                Constants.UPDATE_PAYMENT_INSTRUMENT_MODAL.secondaryText
            }
            secondaryType="neutral"
            onPrimaryAction={props.onUpdateInstrument}
            primaryText={Constants.UPDATE_PAYMENT_INSTRUMENT_MODAL.primaryText}
            primaryType="fill"
            onClickOutside={props.onClose}
        />
    );
}

function DeletionEmptyListDialog(props) {
    return (
        <Dialog
            isShown={props.isShown}
            message={props.message}
            title={Constants.DELETION_API_ERROR_ASSOCIATED.title}
            onClose={props.onClose}
            onPrimaryAction={props.onClose}
            primaryText={Constants.DELETION_API_ERROR_ASSOCIATED.primaryText}
            primaryType="link"
            onClickOutside={props.onClose}
        />
    );
}

function PayoutMethodSummaryInstrumentFilter(props) {
    return (
        <InstrumentFilter
            onFilterChange={props.onFilterChange}
            filterValue={props.filterValue}
            filterValues={
                props.canListPayoutUserInstruments
                    ? FinancialProfileConstants.INSTRUMENT_TYPES_VALUE_DISPLAY
                    : FinancialProfileConstants.INSTRUMENT_TYPES_NON_EPP_VALUE_DISPLAY
            }
        />
    );
}

function PayoutMethodSummaryEmptyState(props) {
    return (
        <div className="eds-g-cell eds-g-cell-1-1 eds-l-mar-top-16 eds-align--center">
            <EmptyState
                graphicType={<BankGraphicSvg />}
                title={gettext('No payout methods')}
                primaryText={
                    isEmpty(props.items) && props.isFilterActive
                        ? gettext('Remove filter')
                        : null
                }
                onPrimaryAction={props.onRemoveFilter}
            />
        </div>
    );
}

function PayoutMethodSummaryPagination(props) {
    return (
        <div className="eds-g-cell eds-g-cell-1-1 eds-align--center">
            <Pagination
                pageNumber={props.paginationSettings}
                pageCount={props.paginationSettings}
                size="small"
                showOnSinglePage={false}
                onSelected={props.onPageSelected}
            />
        </div>
    );
}

function PayoutMethodSummaryEmptyMessage() {
    return (
        <div className="eds-g-cell eds-align--left eds-text-bm eds-l-mar-top-4">
            {FinancialProfileConstants.EMPTY_STATE_MESSAGE}
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

        return (
            <div>
                <DeletionAllowedDialog
                    isShown={this.state.isDeletionAllowedDialogShown}
                    onClose={this._handleClose}
                    onDeletion={this._handleDeletion}
                />
                <DeletionAssociatedEventDialog
                    isShown={this.state.isDeletionAssociatedEventDialogShown}
                    onClose={this._handleClose}
                    onViewEventsOnDeletion={this._handleViewEventsOnDeletion}
                />
                <UpdateInstrumentModal
                    isShown={this.props.isUpdateIntrumentModalOpen}
                    children={this.state.modalUpdateChildren}
                    title={this.state.modalUpdateTitle}
                    onClose={this.props.hideUpdateInstrumentModal}
                    onUpdateInstrument={
                        this._handleClickUpdatePaymentInstrument
                    }
                />
                <InProgressDialog
                    isInProgressDialogOpen={this.props.isInProgressDialogOpen}
                    hideInProgressDialog={this.props.hideInProgressDialog}
                />
                {!isEmpty(paymentInstrumentsItems) &&
                    this.props.isEventsModalOpen && (
                        <EventsModal
                            eventIds={this.state.eventIds}
                            bankName={this.state.bankName}
                            isShown={this.props.isEventsModalOpen}
                            showEventsModal={this.props.showEventsModal}
                            hideEventsModal={this.props.hideEventsModal}
                            getEvents={this.props.getEvents}
                            eventList={this.props.eventList}
                        />
                    )}
                {!isEmpty(paymentInstrumentsItems) &&
                    !isEmpty(this.props.apiHandledErrors) && (
                        <DeletionEmptyListDialog
                            isShown={this.state.isDeletionEmptyListDialogShown}
                            message={this.props.apiHandledErrors.errors._error}
                            onClose={this._handleClose}
                        />
                    )}
                <PayoutMethodSummaryInstrumentFilter
                    onFilterChange={this._handleFilter}
                    filterValue={this.state.filterValue}
                    canListPayoutUserInstruments={
                        this.props.canListPayoutUserInstruments
                    }
                />
                <div className="eds-g-cell eds-g-cell-1-1 eds-align--left eds-l-mar-top-4">
                    {(!isEmpty(paymentInstrumentsItems) ||
                        this.props.isInstrumentTypeFilterActive) && (
                        <PaymentInstrumentTable
                            items={paymentInstrumentsItems}
                        />
                    )}
                    {isEmpty(paymentInstrumentsItems) && (
                        <PayoutMethodSummaryEmptyState
                            items={paymentInstrumentsItems}
                            isFilterActive={
                                this.props.isInstrumentTypeFilterActive
                            }
                            onRemoveFilter={this._handleFilter}
                        />
                    )}
                    {!isEmpty(paymentInstrumentsItems) && (
                        <PayoutMethodSummaryPagination
                            paginationSettings={paginationSettings}
                            onPageSelected={this._handlePageChange}
                        />
                    )}
                </div>
                {!isEmpty(paymentInstrumentsItems) && (
                    <PayoutMethodSummaryEmptyMessage />
                )}
            </div>
        );
    };
}
