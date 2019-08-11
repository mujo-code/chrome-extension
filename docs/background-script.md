# Background Script

The background script is essentially an api to and any shared information between NTP and the Content script is fetched from the background script.

[entrypoint](../src/background.js)
[scripts](../src/background)

## Storage

The background script is the only place we should be going back in forth from the database from. This is because the Content script does not have domain access to the database and instead of having two differnt ways to get data back in forth from the database it is all consolidated into the background script. See how to leverage this in [messaging docs](./messaging).

## Alarms and Notifications

The background script also manages alarms and notifications all back in forth between these apis is done in the background script.

## External calls

All tracking and external api calls should live inside the background script. This way we can avoid adding any additional jank to existing animation or content by funneling this information through the background script. This also allows use to use the same bindings for both the NTP and Content scripts.
