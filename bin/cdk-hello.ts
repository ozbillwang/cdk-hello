#!/usr/bin/env node
import cdk = require("@aws-cdk/core");
import { CdkHelloStack } from "../lib/cdk-hello-stack";

const app = new cdk.App();
new CdkHelloStack(app, "CdkHelloStack");
