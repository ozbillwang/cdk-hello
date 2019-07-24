import dynamodb = require("@aws-cdk/aws-dynamodb");
import iam = require("@aws-cdk/aws-iam");
import lambda = require("@aws-cdk/aws-lambda");
import cdk = require("@aws-cdk/core");

export interface HitCounterProps {
    downstream: lambda.IFunction;
}

export  class HitCounter extends cdk.Construct {
    public readonly handler: lambda.Function;

    constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
        super(scope, id);
        const table = new dynamodb.Table(this, "Hits", {
            partitionKey: { name: "path", type: dynamodb.AttributeType.STRING},
        });

        this.handler = new lambda.Function(this, "HitCounterHandler",  {
            code: lambda.Code.asset("lambda"),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName,
            },
            handler: "hitcounter.handler",
            runtime: lambda.Runtime.NODEJS_10_X,
        });

        const statement = new iam.PolicyStatement();
        statement.addActions("lambda:InvokeFunction");
        statement.addResources("*");

        this.handler.addToRolePolicy(statement);

        table.grantReadWriteData(this.handler);
    }
}
