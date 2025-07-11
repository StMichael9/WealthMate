// Ai helped with this file
import express from "express";
import { plaidClient } from "./Plaid.js";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../Auth/auth.js";

const router = express.Router();

router.post("/create_link_token", async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: "test-user-id" }, // Use real user id in production
      client_name: "WealthMate",
      products: ["auth", "transactions", "identity"],
      country_codes: ["US", "CA", "GB"],
      language: "en",
    });
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const prisma = new PrismaClient();

// Exchange public_token, fetch accounts, and save to DB
router.post("/exchange_public_token", authenticate, async (req, res) => {
  try {
    const { public_token } = req.body;
    const userId = req.user.id;

    // Exchange public_token for access_token
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    const access_token = tokenResponse.data.access_token;

    // Fetch accounts from Plaid
    const accountsResponse = await plaidClient.accountsGet({ access_token });
    const accounts = accountsResponse.data.accounts;

    // Save each account to your DB, associated with the user
    for (const acct of accounts) {
      await prisma.bankAccount.upsert({
        where: { plaidAccountId: acct.account_id },
        update: {
          balance: acct.balances?.current ?? acct.balances?.available ?? null,
        },
        create: {
          userId,
          plaidAccountId: acct.account_id,
          name: acct.name,
          mask: acct.mask,
          subtype: acct.subtype,
          type: acct.type,
          balance: acct.balances?.current ?? acct.balances?.available ?? null,
        },
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all banks for the logged-in user
router.get("/banks", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const banks = await prisma.bankAccount.findMany({ where: { userId } });
    res.json({ banks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/banks/:id", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const bankId = req.params.id;

    // Find the bank account to ensure it belongs to the user
    const bank = await prisma.bankAccount.findUnique({ where: { id: bankId } });
    if (!bank || bank.userId !== userId) {
      return res.status(404).json({ error: "Bank account not found" });
    }

    // Delete the bank account
    await prisma.bankAccount.delete({ where: { id: bankId } });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/transactions", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const { bankId } = req.query;
    if (!bankId) return res.status(400).json({ error: "bankId is required" });

    // Find the bank account and get its Plaid access info
    const bank = await prisma.bankAccount.findUnique({ where: { id: bankId } });
    if (!bank || bank.userId !== userId) {
      return res.status(404).json({ error: "Bank account not found" });
    }

    // You need to store access_token per user+item in production.
    // For demo, you may need to fetch it from somewhere.
    // Here, you would retrieve the access_token for this bank account.
    // For now, let's assume you have a way to get it (e.g., bank.accessToken).

    // Example: fetch transactions from Plaid
    // const access_token = bank.accessToken;
    // const plaidRes = await plaidClient.transactionsGet({
    //   access_token,
    //   start_date: "2024-01-01",
    //   end_date: new Date().toISOString().slice(0, 10),
    // });
    // const transactions = plaidRes.data.transactions;

    // For now, return a mock response
    const transactions = [
      {
        id: "txn1",
        date: "2025-07-10",
        name: "Coffee Shop",
        category: ["Food", "Coffee"],
        amount: -4.5,
      },
      {
        id: "txn2",
        date: "2025-07-09",
        name: "Payroll",
        category: ["Income"],
        amount: 1200,
      },
    ];

    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
