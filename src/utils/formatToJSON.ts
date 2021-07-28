import { APIGatewayProxyResult } from "aws-lambda";

export function formatToJSON(statusCode = 200, body: Object): APIGatewayProxyResult {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json"
    }
  }
}