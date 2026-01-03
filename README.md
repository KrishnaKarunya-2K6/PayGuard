# PayGuard  
### Risk‑Based Invoice Verification & Payment System

PayGuard is a frontend‑only demo built for the **MNEE Hackathon**, showcasing how **programmable money** can be released automatically based on risk‑aware business logic.

The system automates low‑risk invoice payments while routing higher‑risk cases to human approval, reducing manual workload without sacrificing control.

---

## Problem Statement

In many organizations, invoice payments are:
- Manually reviewed regardless of risk
- Slow due to unnecessary approvals
- Error‑prone and inconsistent
- Dependent on human judgment for routine cases

This leads to delayed vendor payments, increased operational cost, and inefficient finance workflows.

---

## Solution: PayGuard

PayGuard introduces a **risk‑based approval engine** that decides **when money should move automatically** and **when a human must intervene**.

Invoices are evaluated based on:
1. **Vendor Identity** (registered vs unregistered)
2. **Invoice Validity** (required fields present)
3. **Invoice Amount** (company‑defined threshold)

Low‑risk invoices are auto‑approved, while higher‑risk invoices are routed for manual review.

---

## How It Works (High‑Level Workflow)

1. **Vendor submits an invoice**
2. System checks:
   - Vendor registration
   - Invoice validity
   - Amount vs auto‑approval limit
3. **Decision Engine**
   - If all conditions pass → Auto‑Approve
   - Otherwise → Manual Approval required
4. **Admin approves or rejects risky invoices**
5. *(Production concept)* Approved invoices would trigger an **MNEE smart‑contract payment**

---

## Core Decision Logic

```text
IF vendor is registered
AND invoice is valid
AND amount ≤ auto‑approval limit
→ Auto‑Approve

ELSE
→ Manual Review Required
