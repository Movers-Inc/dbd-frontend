import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SPREADSHEET_ID = "1rZM9lLBwRqtfNi03wY8_f17sk44PP3Wd8vpdxOFbk80";

const serviceAccount = {
  type: "service_account",
  project_id: "poppi-451605",
  private_key_id: "dff334b47c4a5c8816c2c1995d1f5c0596777fa6",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCslArEwCdxPdtG\nlTn7rWQc7H5NoLWdTwK4PDefExNP/jKCj85aEpOJtlKxNAG9gOrQROwgsA9C+hYw\n5rw9PT8IC3exaeEAeNLPr9BoExKg3eI746LUpWej/KpRHOlMCaq+G6RNxRqPLBzR\njZnkHAR/sjtfazfWqn1dvjmsCzHaqHX8ZTtSShcBG8XGwTn3tYaS4QO03KuWYGX/\ngsVE6ricF23dqpnII2riW6VDzLLiXOOFxVLs9RF3Gio11ofEdRffzGFzSpnGcwUj\nT87bJg9BaxVsN779DGjxa24VCRJlSzqUPFmx0JvYTCbF008/S7YjgLjD+434EiBY\nb4K1GRqfAgMBAAECggEAEwQvGZYI4pgL0P/Bh2OITA2dL0WdrYtWw+FSybMK5j4e\n57cb6F3ypvKRsxgFdxG9Dh0CHen4jItNJa9PH7pfdy34TvLZSbmGlT8MymMLovFA\nLBQ9zYu6W14MkGqMpIXOLCuUk8M71XnpZQfi5LlXn5COrUl9uihILyu2ZChJoovO\nPRanVGpZuwz4CIiAJ18Dry7gZFc1pv2UmRXPnkJTTJbMGHuf9URUcZ7kljp+aakr\ncPhIUkSejz2TELc3B10cIuKkTW4VxsZYkJfUiJd9gWLf2vph5JtkGTZ/QC4SjVcu\nTuu17hKtT5y8jhtH4t8mONfnZrV/Sy1F/pW88mM3FQKBgQDUuEQ2V/dleO9Y60R5\nq5dgcmEIRRbxteCEpVEVZGAETd3d3bfNxVgd6T+Fh/EARDpnj/qyUbylaagCxgG4\nOTG1OYLgxb8yyqo2lkLiNtAR5JXLXYtxFZWBsvEZ/QxF4WZLMW+AH1VIJnJmQXtF\nvUjP0pJ1+whzPF3txpshxBuyuwKBgQDPsPaf33IdTXGsWQN0ETrX74Yl06X2oXGp\nbK8wgP049hx4L3X/k4rztmY5ZSU3JBQWiJk3x5+NJlg2NYY6UNHJaxyZVKQDyFMn\nrHZvmIxLkazZr99EkEQPpyzWNJ6Qu30mnOtXiFtomYxS7gZ3ty9C+15PB2FRRDNZ\nexAKFcxzbQKBgQCniPkwU9flc3oO7jzgFuUCcRM7EC8h770Eu69Aye1Vdn5nX1iE\nGAluhWYiJQ8KxrG5HwyzpOyO2sgYZxqznVgpA0KxBQ2xUyz8ERxcTg9SCFZx9Rr9\n1aIKpIR/k203HG8UibrnjcX9LUqsfqY4JvxRseboRO5C1CimPOWxkmK+QQKBgQDD\nSZtsklcjtGk5bG1x2q2g00kpEkzQjddpPpewHOl9gPUeEUp7qYkTRiPyvedzZMo6\nsfCX4W1l9HMnbcar2MiaAsxeZJbgM6H1ARZQMnlgqTaFbfia6KgGq+Pd+pZKcvDn\nuM8VfFKvFQo8BDIyqR2YdvGjj8Xy+xTpg2x+fybCNQKBgQCBi6QF3GWsTbd5pCp/\nicYXxlOiuVes5odROJNSWtEtqxDMKptGlsw5t3Hngaw2tJ6EHxsthhEfesyP1LE9\nQPqzH+MFc1FbU92U6uTT/wwPBisk3IPQSPgJZRGjX9q4LlhzVIJsnKbCCcnXzBq2\nLd3TZLo/VlixjKou2MYvJyUf4A==\n-----END PRIVATE KEY-----\n",
  client_email:
    "poppi-lite-codemanagement@poppi-451605.iam.gserviceaccount.com",
  client_id: "110137902512468586873",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/poppi-lite-codemanagement%40poppi-451605.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

export interface FormSubmissionData {
  plan: string;
  bankName: string;
  cardNumber1: string;
  phone?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: FormSubmissionData = await request.json();

    // JWT 인증 설정
    const auth = new google.auth.JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    // Google Sheets API 클라이언트 생성
    const sheets = google.sheets({ version: "v4", auth });

    // 현재 데이터 조회하여 다음 빈 행 찾기
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "A:D" // A부터 D열까지 조회
    });

    const existingRows = getResponse.data.values || [];
    const nextRow = existingRows.length + 1;

    // 데이터 준비 (plan, bankName, cardNumber1, phone 순서)
    const rowData = [
      data.plan,
      data.bankName,
      data.cardNumber1,
      data.phone || "" // phone이 없으면 빈 문자열
    ];

    // 스프레드시트에 데이터 추가
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `A${nextRow}:D${nextRow}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [rowData]
      }
    });

    return NextResponse.json({ success: true, row: nextRow });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "데이터 저장에 실패했습니다." },
      { status: 500 }
    );
  }
}
