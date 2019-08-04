import apigw = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import cdk = require("@aws-cdk/core");
import { TableViewer } from "cdk-dynamo-table-viewer";
import { HitCounter } from "./hitcounter";

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, "HelloHandler", {
      code: lambda.Code.asset("lambda"),
      handler: "hello.handler",
      runtime: lambda.Runtime.NODEJS_10_X,
    });

    const helloWithCounter = new HitCounter(this, "HelloHitCounter", {
      downstream: hello,
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, "HitCounter", {
      handler: helloWithCounter.handler,
    });

    new TableViewer(this, "TableViewer", {
      table: helloWithCounter.table,
      title: "Hello Hits",
    });
  }
}
