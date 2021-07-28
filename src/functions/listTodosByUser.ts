import { validate } from "uuid";
import { APIGatewayProxyHandler } from "aws-lambda";

import { formatToJSON } from "src/utils/formatToJSON";
import { document, tableName } from "src/utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  if (!validate(user_id)) {
    return formatToJSON(400, {
      error: "UUID Invalid"
    });
  }

  const response = await document.scan({
    TableName: tableName,
  }).promise()

  const todos = response.Items.filter((todo) => todo.user_id === user_id)

  return formatToJSON(200, {
    todos
  });
}
