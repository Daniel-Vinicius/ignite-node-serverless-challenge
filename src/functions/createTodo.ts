import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { validate, v4 as uuidv4 } from "uuid";
import { APIGatewayProxyHandler } from "aws-lambda";

import { formatToJSON } from "src/utils/formatToJSON";
import { document, tableName } from "src/utils/dynamodbClient";

interface ICreateTodo {
  title: string;
  deadline: string;
}

dayjs.extend(utc);

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  if (!validate(user_id)) {
    return formatToJSON(400, {
      error: "UUID Invalid"
    });
  }

  if (!title || !deadline) {
    return formatToJSON(400, {
      error: "missing fields title or deadline"
    });
  }

  if (!dayjs(deadline).isValid()) {
    return formatToJSON(400, {
      error: "deadline need a valid Date"
    });
  }

  const data = {
    id: uuidv4(),
    user_id,
    title,
    done: false,
    deadline: dayjs(Number(deadline)).toDate()
  }

  await document.put({
    TableName: tableName,
    Item: data,
  }).promise();

  return formatToJSON(200, data);
}
