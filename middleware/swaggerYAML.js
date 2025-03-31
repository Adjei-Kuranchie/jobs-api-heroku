const YAML = require("yamljs");

const yaml = `
openapi: 3.0.0
info:
  title: Jobs Api
  version: 1.0.0
servers:
  - url: https://jobs-api-pearl.vercel.app/api/v1
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
tags:
  - name: Auth
  - name: Jobs
paths:
  /auth/register:
    post:
      tags:
        - Auth
      summary: Register User
      requestBody:
        content:
          application/json:
            schema:
              type: object
              example:
                name: Peter
                email: peter20@gmail.com
                password: Superman
      responses:
        "200":
          description: Successful response
          content:
            application/json: {}
  /auth/login:
    post:
      tags:
        - Auth
      summary: User Login
      requestBody:
        content:
          application/json:
            schema:
              type: object
              example:
                email: peter10@gmail.com
                password: Superman
      responses:
        "200":
          description: Successful response
          content:
            application/json: {}
  /jobs:
    get:
      tags:
        - Jobs
      summary: Get All Jobs
      security:
        - bearerAuth: []
      responses:
        "200":
          description: Successful response
          content:
            application/json: {}
    post:
      tags:
        - Jobs
      summary: Create Job
      requestBody:
        content:
          application/json:
            schema:
              type: object
              example:
                company: Meta
                position: AR Developer
      security:
        - bearerAuth: []
      responses:
        "200":
          description: Successful response
          content:
            application/json: {}
  /jobs/{id}:
    parameters:
      - in: path
        name: id
        schema:
          type: string
        required: true
        description: the job id
    get:
      tags:
        - Jobs
      summary: Get Job
      security:
        - bearerAuth: []
      responses:
        "200":
          description: Successful response
          content:
            application/json: {}
    patch:
      tags:
        - Jobs
      summary: Update Job
      requestBody:
        content:
          application/json:
            schema:
              type: object
              example:
                company: Snap Dragon
                position: Fullstack Developer
      security:
        - bearerAuth: []
      responses:
        "200":
          description: Successful response
          content:
            application/json: {}
    delete:
      tags:
        - Jobs
      summary: Delete Job
      security:
        - bearerAuth: []
      responses:
        "200":
          description: Successful response
          content:
            application/json: {}

`;

const swaggerDocument = YAML.parse(yaml);

module.exports = { swaggerDocument };
