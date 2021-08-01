# Shadow
Simple CLI utilility to encrypt / decrypt sensitive files based on AES encryption

<br/>
    <img src='./assets/shadow.svg' alt='shadow' width=360 height=360/>
<br/>
<br/>

## Installation
```bash
npm i -g @accelerator_one/shadow
```

<br/>

## Usage
**shadow** [*options*] [*command*]

### Options:

| Argument | Description | Default |
|:---------|:------------|:--------|
|  -V, --version              | output the version number                               | -        |
|  -r, --recursive            | recursive operation inside child directories            | *false*   |
|  -i, --include <type>       | specify the file extension allowed for processing       | ''       |
|  -e, --exclude <type>       | specify the file extension to exclude for processing    | ''       |
|  -p, --password <password>  | secret key to encrypt/decrypt file(s)                   | *required* |
|  -h, --help                 | display help for command                                | -        |

### Commands:
  
| Command | Description |
|:--------|:------------|
| encrypt [file] | Encrypt the specified file, otherwise collection of files |
| decrypt [file] | Decrypt the specified file, otherwise collection of files |
| help [command] | display help for command                                  |

<br/>    
    
## Issues    
In case of any problems faced, please mark them under *Issues* section of this repository
