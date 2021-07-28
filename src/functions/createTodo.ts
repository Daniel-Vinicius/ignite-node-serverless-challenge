import { APIGatewayProxyHandler } from "aws-lambda";
import { formatToJSON } from "src/utils/formatToJSON";

interface ICreateTodo {
  title: string;
  deadline: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  console.log(title, deadline)

  return formatToJSON(200, { message: "Created Todo" });
}
