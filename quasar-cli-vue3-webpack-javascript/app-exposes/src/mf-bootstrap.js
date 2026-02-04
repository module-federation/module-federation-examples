// Async bootstrap entry for Quasar + Module Federation.
// The dynamic import creates the async boundary needed for shared module
// negotiation when not using asyncStartup (which causes BUILD-001 in CI).
import('../.quasar/client-entry');
