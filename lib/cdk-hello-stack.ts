import lambda = require("@aws-cdk/aws-lambda");
import cdk = require("@aws-cdk/core");

export class CdkHelloStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, "HelloHandler", {
      code: lambda.Code.asset("lambda"),
      description: "lambda demo with cdk",
      handler: "hello.handler",
      runtime: lambda.Runtime.NODEJS_10_X,
    },

    );
  }
}
