module.exports = (transaction) => ({
    label: transaction.label,
    amount: transaction.amount,
    currency: transaction.currency,
});
