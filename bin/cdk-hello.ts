#!/usr/bin/env node
import sns = require('@aws-cdk/aws-sns');
import sqs = require('@aws-cdk/aws-sqs');
import cdk = require('@aws-cdk/cdk');

class CdkHelloStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
        super(parent, name, props);

        const queue = new sqs.Queue(this, 'CdkHelloQueue', {
            visibilityTimeoutSec: 300
        });

        const topic = new sns.Topic(this, 'CdkHelloTopic');

        topic.subscribeQueue(queue);
    }
}

const app = new cdk.App(process.argv);

new CdkHelloStack(app, 'CdkHelloStack');

process.stdout.write(app.run());
