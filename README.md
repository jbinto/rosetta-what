# rosetta-what

This is a repro of a bug I hit with Docker for Mac with Rosetta enabled.

This brings in an old npm dependency called `keypair` which does crypto operations in pure Node. It is "slow", but in Rosetta it is either 4+ orders of magnitude slower or it is stuck in a loop - it never finishes.

## usage

```
docker run --platform linux/amd64 jbinto/rosetta-what
```

With `Use Rosetta for x86/amd64 emulation on Apple Silicon` disabled, this returns in a few seconds:

```
success after 9675.633ms
{
  keys: {
    public: '-----BEGIN RSA PUBLIC KEY-----\n' +
      'MIIBCgKCAQEAh7z2Onsl7/jhU5mqWZth51wndOSUaY4AYGASFz3DBx++ldiEir9WmCnIVbPH\n' +
      '0kvH1kH8tKoWRPlhI18QZGKV1RVxKtOfUeB8uT2zx7QDXF5q3OMzMPR/kSRs56WRT5nN4XeK\n' +
      'TBGDiqz5shmgbMRg+cAlUkrTinTqok7/ut+QQD8e0vD1eW2KTH01QbgClBwfGAoEvBPTvppo\n' +
      'mzR/JAbzJPwG7g3IAX/pQrcdLKsKpAQJTDH8UHr0Jgz43ZKZo9+M1JuBkFEiPAtDmNX7OJ4V\n' +
      'mIeufpD54/9MHEcXijLRIsaHnuY+mY0uX5IjziLnBIZxhKpX4lmRak+w9dhJGbgy/QIDAQAB\n' +
      '-----END RSA PUBLIC KEY-----\n',
    private: '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIEogIBAAKCAQEAh7z2Onsl7/jhU5mqWZth51wndOSUaY4AYGASFz3DBx++ldiEir9WmCnI\n' +
      'VbPH0kvH1kH8tKoWRPlhI18QZGKV1RVxKtOfUeB8uT2zx7QDXF5q3OMzMPR/kSRs56WRT5nN\n' +
      '4XeKTBGDiqz5shmgbMRg+cAlUkrTinTqok7/ut+QQD8e0vD1eW2KTH01QbgClBwfGAoEvBPT\n' +
      'vppomzR/JAbzJPwG7g3IAX/pQrcdLKsKpAQJTDH8UHr0Jgz43ZKZo9+M1JuBkFEiPAtDmNX7\n' +
      'OJ4VmIeufpD54/9MHEcXijLRIsaHnuY+mY0uX5IjziLnBIZxhKpX4lmRak+w9dhJGbgy/QID\n' +
      'AQABAoIBAFKeb3j1EAhagjvyYj+cViEOdG2v263L4urGTvyaeSTS65wlZ7dT8w83D1sqzEty\n' +
      'GLaO/5Ovm1JsP/XZnQ6c+vnxzSn2GRkq/H970PuS1CDaz0yXdccsaqEbfLYajrHWufusWR8n\n' +
      '4dr8ohcHhh/t/+DEVXMbXFsAAvi8AOfrv896OPCVOnYIaJ7jT8R+OMxAtI1SGUAH11OmAqsT\n' +
      '2lxfHr1LUT1loMKTU093rZSMlDqzqJfqImOxnPAAJzggjHBmwv9UPYLzStwWUVd3l0oS2cbR\n' +
      'HKaQGU1Y5nG5YLk/2rkSE0Hbeo8j7nz0Bie/MeIxxFCoysCZrT7GUmLSfhffnkECgYEAv/cF\n' +
      'i7DSMCpI4UBsb1+idIO85nW8L+Nf6JUegDipLCiZVDZg2uBQE7euAlxU3U29y3uf6azJKLLz\n' +
      'czb5orNTmsP1+/v69CN5lo3DO6cpBjAyl9pP2Av4+KJ5HsmXtkyNYHfW9W+d5xCvNUMFgoPe\n' +
      'W98A8nuWqeE70G6onky4mKkCgYEAtQRp8yBELvKFjvwIZk3XS25bHi8hDkBcsPh6JziFymW8\n' +
      'v0QMsH6QJqTuTERKKIP7SbCrkxifwdASU5QXK6Kg8q43spXOuvrsvv0Gguxu1gXn1nrk7+e/\n' +
      'JJJVfyjZtzDCIQ5l/E1UzuG4DgelpEJoWqJUi7Sxy8USlgmZmpZi2DUCgYBejTVWEMn2n102\n' +
      'VZ0TXm+OJDUu7l6616uty4UycrYg4f5j1ETwifvnOlmjIAdM2bXaPBIP7uNGAJ6Y6UMcOGe9\n' +
      'mzfV3c9F4RNKbJj1EOjL+4Fv+j/JklwXWy99Up4/VIVuNpjSWx/TaAxkl5ZnKryjU7wLs4QK\n' +
      'OL5Vc6vqDK//wQKBgEH/3P13W0TeyhGLFSjv4rqu/uvvdRb0Ipen0Snxst5L39jA3/uN+dMN\n' +
      'OZF3KK7DCGEi2Dvms4D/816j1RrkzdgN62LiuiB0ktNEABbGS9cfChuqbUSHc6rK6/9UDqV7\n' +
      'Upyo2kh2jaBsriX3Zc6RI+k/3KGffV/1d8RatbWmdV2tAoGAXrOUnqX25fWhdaUxgZGZ6ygK\n' +
      'IzBRaI1lAggodkaw/gyWrOyWe7t1M8/uIPTIyleMJV85fMdTai7mbtZTL0O849toxjfsr3n5\n' +
      '6GQMRm8ej4V1zeBjZxFo/i6ub9x8ZUGww4gM/XtrkS7qbLDsu/4pYNYxMXgQy2knOr2c/dby\n' +
      'HK4=\n' +
      '-----END RSA PRIVATE KEY-----\n'
  }
}
```

With `Use Rosetta for x86/amd64 emulation on Apple Silicon` enabled, the container takes 100% CPU and "never" returns. Longest I waited was 14 hours.


## build

```
docker buildx build --platform linux/amd64 --push -t jbinto/rosetta-what .
```

n.b. On an Apple Silicon device, using buildx without `--push`, images remain in the build cache; was easier for me just to push to dockerhub and run it back than look up shas