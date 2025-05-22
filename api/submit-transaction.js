import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse JSON body
  let body = {};
  try {
    body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { crypto, network, amount, address } = body;

  // Compose issue title and body
  const title = `Transaction: ${crypto} - ${network} - ${amount} USD`;
  const issueBody = [
    `**Crypto:** ${crypto}`,
    `**Network:** ${network}`,
    `**Amount:** ${amount}`,
    `**Address:** ${address}`,
    `**Date:** ${new Date().toISOString()}`
  ].join('\n');

  // GitHub API endpoint
  const repoOwner = 'YOUR_GITHUB_USERNAME_OR_ORG'; // <-- CHANGE THIS
  const repoName = 'YOUR_REPO_NAME'; // <-- CHANGE THIS
  const githubToken = process.env.GH_TOKEN;

  const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body: issueBody })
  });

  if (response.ok) {
    res.status(200).json({ success: true });
  } else {
    const error = await response.json();
    res.status(500).json({ success: false, error });
  }
}
