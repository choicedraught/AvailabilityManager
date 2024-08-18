# AvailabilityManager
The AvailabilityManager started out as a request from my Cricket Club for a way to collect and visualise which matches each player could play and not play.  Following a subsequent request from a friends Soccer Club, I made the code more generic such that it could be applied to Fixture models of a different shape.

It is designed to be Serverless and is based on AWS Cloudfront, S3, API Gateway, DynamoDB and Cognito.

The Web App includes Role Based access based on Cognito Groups that allows both a player to login and post / update their availability and a Coach to login and view the availability for the entire squad.

## History
The original version was HTML, js, css, PHP with a backend based on Google Sheets.  It was slow but it worked.  Downside was that the PHP required a IaaS VM to run and this made ongoing costs greater than the $0 budget.

The second version was also IaaS based with PHP and a PostgreSQL backend.  Certainly much quicker but still costly to run.

Version 3 in this reposity was the most successful and cheapest to run.  It was used for 3 seasons and retired prior to the 2023-24 season.
