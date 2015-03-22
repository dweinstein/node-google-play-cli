# SYNOPSIS

Command line tools using the
[`node-google-play`](https://github.com/dweinstein/node-google-play) library.

# OPTIONS

The following **environment variables** are used:

- `GOOGLE_LOGIN` - email address used on a mobile phone.
- `GOOGLE_PASSWORD` - The password used to access the Play service.
- `ANDROID_ID` - the ID for the device for Google. Your ID can be obtained by
  "dialing" *#*#8255#*#* - look for Device ID, remove `android-` prefix.

# USAGE

I use the [`jq`](https://github.com/stedolan/jq) tool to stream the JSON results.

## Download

Download the app to your current directory.
- `$ gp-download air.WatchESPN > air.WatchESPN.apk`

## Bulk Details

- `$ gp-bulk-details air.WatchESPN com.viber.voip | jq '.'`

## Delivery info

This info is sent from the server to the device before downloading the app.

- `$ gp-delivery air.WatchESPN | jq '.'`

## Integrity

Get the SHA1 checksum for the file from Google.

```
$ gp-get-sha1 air.WatchESPN
{ packageName: 'air.WatchESPN',
  versionCode: 2100049,
  sha1: '5381ff6fbcb36032aea1c3b83d921b94602c2f3a' }
```
