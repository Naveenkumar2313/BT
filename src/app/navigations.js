const navigations = [
  { name: "Problems", path: "/problems", icon: "code" },
 {
    id: "payments",
    name: "Payments",
    iconText: "💳",
    icon: "payments",
    type: "section",
    modules: [
      {
        id: "fee-collection",
        name: "Fee Collection",
        icon: "receipt_long",
        pages: [
          { name: "Collect Fee", path: "/dummy1", iconText: "CF" },
          { name: "Fee Receipts", path: "/payments/receipts", iconText: "FR" },
          { name: "Pending Dues", path: "/payments/pending", iconText: "PD" },
          { name: "Bulk Upload", path: "/payments/bulk-upload", iconText: "BU", badge: "new" },
          { name: "Concessions", path: "/payments/concessions", iconText: "CO" }
        ]
      },
      {
        id: "fee-structure",
        name: "Fee Structure",
        icon: "list_alt",
        pages: [
          { name: "Fee Heads", path: "/payments/fee-heads", iconText: "FH" },
          { name: "Programme Mapping", path: "/payments/programme-mapping", iconText: "PM" },
          { name: "Instalment Plans", path: "/payments/instalment-plans", iconText: "IP" },
          { name: "Late Fine Rules", path: "/payments/late-fine", iconText: "LF" }
        ]
      },
      {
        id: "refunds",
        name: "Refunds & Adjustments",
        icon: "undo",
        pages: [
          { name: "Refund Requests", path: "/payments/refund-requests", iconText: "RR" },
          { name: "Adjustment Ledger", path: "/payments/adjustment-ledger", iconText: "AL" },
          { name: "Approval Queue", path: "/payments/approval-queue", iconText: "AQ" }
        ]
      },
      {
        id: "gateway-config",
        name: "Gateway Config",
        icon: "cable",
        pages: [
          { name: "Provider Settings", path: "/payments/provider-settings", iconText: "PS", badge: "beta" },
          { name: "Webhook Logs", path: "/payments/webhook-logs", iconText: "WL" },
          { name: "Failed Txns", path: "/payments/failed-txns", iconText: "FT" }
        ]
      },
      {
        id: "pay-reports",
        name: "Reports",
        icon: "bar_chart",
        pages: [
          { name: "Daily Collection", path: "/payments/daily-collection", iconText: "DC" },
          { name: "Outstanding Report", path: "/payments/outstanding", iconText: "OR" },
          { name: "Bank Deposit", path: "/payments/bank-deposit", iconText: "BD" },
          { name: "Audit Trail", path: "/payments/audit-trail", iconText: "AT" }
        ]
      }
    ]
  },
  {
    id: "finance",
    name: "Finance",
    iconText: "📊",
    icon: "account_balance",
    type: "section",
    modules: [
      {
        id: "accounts",
        name: "Accounts",
        icon: "account_balance_wallet",
        pages: [
          { name: "Chart of Accounts", path: "/finance/chart-of-accounts", iconText: "CA" },
          { name: "Journal Entries", path: "/finance/journal-entries", iconText: "JE" },
          { name: "Trial Balance", path: "/finance/trial-balance", iconText: "TB" },
          { name: "Ledger View", path: "/finance/ledger-view", iconText: "LV" }
        ]
      },
      {
        id: "budgets",
        name: "Budgets",
        icon: "savings",
        pages: [
          { name: "Budget Heads", path: "/finance/budget-heads", iconText: "BH" },
          { name: "Allocation", path: "/finance/allocation", iconText: "AL" },
          { name: "vs Actual", path: "/finance/vs-actual", iconText: "VA" }
        ]
      },
      {
        id: "payables",
        name: "Payables",
        icon: "outbox",
        pages: [
          { name: "Vendor Bills", path: "/finance/vendor-bills", iconText: "VB" },
          { name: "Payment Runs", path: "/finance/payment-runs", iconText: "PR", badge: "new" },
          { name: "Ageing Report", path: "/finance/ageing-report", iconText: "AR" }
        ]
      },
      {
        id: "gst",
        name: "GST & Compliance",
        icon: "gavel",
        pages: [
          { name: "GSTR-1", path: "/finance/gstr1", iconText: "G1" },
          { name: "GSTR-3B", path: "/finance/gstr3b", iconText: "G3" },
          { name: "ITC Register", path: "/finance/itc-register", iconText: "IR" },
          { name: "E-Invoicing", path: "/finance/e-invoicing", iconText: "EI", badge: "beta" }
        ]
      },
      {
        id: "fin-reports",
        name: "Financial Reports",
        icon: "assessment",
        pages: [
          { name: "P&L Statement", path: "/finance/pnl-statement", iconText: "PL" },
          { name: "Balance Sheet", path: "/finance/balance-sheet", iconText: "BS" },
          { name: "Cash Flow", path: "/finance/cash-flow", iconText: "CF" },
          { name: "Ratio Analysis", path: "/finance/ratio-analysis", iconText: "RA" }
        ]
      }
    ]
  },
  {
    id: "hr",
    name: "HR",
    iconText: "👥",
    icon: "people",
    type: "section",
    modules: [
      {
        id: "employees",
        name: "Employee Master",
        icon: "badge",
        pages: [
          { name: "Employee List", path: "/hr/employee-list", iconText: "EL" },
          { name: "Add Employee", path: "/hr/add-employee", iconText: "AE" },
          { name: "Documents", path: "/hr/documents", iconText: "DO" },
          { name: "Org Chart", path: "/hr/org-chart", iconText: "OC", badge: "new" }
        ]
      },
      {
        id: "attendance",
        name: "Attendance",
        icon: "schedule",
        pages: [
          { name: "Daily Register", path: "/hr/daily-register", iconText: "DR" },
          { name: "Leave Management", path: "/hr/leave-management", iconText: "LM" },
          { name: "Biometric Sync", path: "/hr/biometric-sync", iconText: "BS" },
          { name: "Shift Roster", path: "/hr/shift-roster", iconText: "SR" }
        ]
      },
      {
        id: "payroll",
        name: "Payroll",
        icon: "payments",
        pages: [
          { name: "Salary Structure", path: "/hr/salary-structure", iconText: "SS" },
          { name: "Run Payroll", path: "/hr/run-payroll", iconText: "RP" },
          { name: "Payslips", path: "/hr/payslips", iconText: "PS" },
          { name: "TDS / Form 16", path: "/hr/tds-form16", iconText: "TF" },
          { name: "PF & ESI", path: "/hr/pf-esi", iconText: "PE" }
        ]
      },
      {
        id: "recruitment",
        name: "Recruitment",
        icon: "person_search",
        pages: [
          { name: "Job Openings", path: "/hr/job-openings", iconText: "JO" },
          { name: "Applications", path: "/hr/applications", iconText: "AP" },
          { name: "Interview Schedule", path: "/hr/interview-schedule", iconText: "IS" },
          { name: "Offer Letters", path: "/hr/offer-letters", iconText: "OL" }
        ]
      }
    ]
  },
  {
    id: "dash",
    name: "Dashboard",
    iconText: "🏠",
    icon: "home",
    type: "section",
    modules: [
      {
        id: "overview",
        name: "Overview",
        icon: "space_dashboard",
        pages: [
          { name: "Executive Dashboard", path: "/dashboard/default", iconText: "ED" },
          { name: "KPI Widgets", path: "/dash/kpi-widgets", iconText: "KW" },
          { name: "Announcements", path: "/dash/announcements", iconText: "AN" }
        ]
      },
      {
        id: "analytics",
        name: "Analytics",
        icon: "analytics",
        pages: [
          { name: "Enrolment Trends", path: "/dash/enrolment-trends", iconText: "ET" },
          { name: "Revenue Analytics", path: "/dash/revenue-analytics", iconText: "RA" },
          { name: "HR Metrics", path: "/dash/hr-metrics", iconText: "HM" },
          { name: "Custom Reports", path: "/dash/custom-reports", iconText: "CR", badge: "new" }
        ]
      },
      {
        id: "settings-dash",
        name: "Settings",
        icon: "settings",
        pages: [
          { name: "General", path: "/dash/settings/general", iconText: "GN" },
          { name: "Roles & Permissions", path: "/dash/settings/roles", iconText: "RP" },
          { name: "Academic Year", path: "/dash/settings/academic-year", iconText: "AY" },
          { name: "Integrations", path: "/dash/settings/integrations", iconText: "IN" }
        ]
      }
    ]
  }
];

export default navigations;
