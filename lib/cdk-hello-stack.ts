import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');

export class CdkHelloStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {

      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.asset('lambda'),
      handler: 'hello.handler',
      description: 'lambda demo with cdk'
    }

    )
  }
}
