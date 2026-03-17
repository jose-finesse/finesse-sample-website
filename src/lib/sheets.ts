import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(
    /\\n/g,
    "\n"
  );

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: SCOPES,
  });
}

export async function appendToSheet(values: string[][]) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  });
}

export async function getSheetData() {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A:E",
  });

  return response.data.values || [];
}
