# MultiStepForm

Angular dynamic reactive multistep form with validation, using bootstrap 5. 


# Structure

JSON is used to present the structure of the form.
Example od creating a 2 step form 

```json
{
    "steps": {        
        "user_info": {
			"title": "User Info",
            "fields": {
                "email": {
                    "label": "Email",
                    "rules": {
                        "email": "email",
                        "required": true
                    },
                    "type": "email",
                    "value": ""
                },
                "username": {
                    "label": "Username",
                    "rules": {
                        "minLength": 4,
                        "required": true
                    },
                    "type": "text",
                    "value": ""
                }
            }
        },		
        "password": {  
            "title": "Password",		
            "fields": {
                "password": {
                    "label": "Password",
                    "rules": {
                        "minLength": 8,
                        "required": true
                    },
                    "type": "password",
                    "value": ""
                },
                "repassword": {
                    "label": "Confirm Password",
                    "rules": {
                        "minLength": 8,
                        "required": true
                    },
                    "type": "password",
                    "value": ""
                }
            }
        }
    }
}
```

# Form Validation

Two types of validatons are available : field and crossfield validations:
Example of registration form with field and crossfield validaiton:

```json
{
    "steps": {        
        "user_info": {
			"title": "User Info",
            "fields": {
                "email": {
                    "label": "Email",
                    "rules": {
                        "email": "email",
                        "required": true
                    },
                    "type": "email",
                    "value": ""
                },
                "secondary_email": {
                    "label": "Secondary Email",
                    "rules": {
                        "pattern": {
                            "msg": "Please enter correct email address",
                            "regex": /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
                        },
                        "required": true
                    },
                    "type": "email",
                    "value": ""
                },
                "username": {
                    "label": "Username",
                    "rules": {
                        "minLength": 4,
                        "required": true
                    },
                    "type": "text",
                    "value": ""
                }
            }
        },		
        "password": {  
            "title": "Password",		
            "fields": {
                "password": {
                    "label": "Password",
                    "rules": {
                        "minLength": 8,
                        "required": true
                    },
                    "type": "password",
                    "value": ""
                },
                "repassword": {
                    "label": "Confirm Password",
                    "rules": {
                        "minLength": 8,
                        "required": true
                    },
                    "type": "password",
                    "value": ""
                }
            },
          "cross_field_validation": [
                {
                    "errorMsg": "Passwords should match",
                    "errorName": "mismatch",
                    "function": "match",
                    "inputs": [
                        "password",
                        "repassword"
                    ],
                    "parameters": [
                        "password",
                        "repassword",
                        "mismatch"
                    ]
                }
            ]
        }
    }
}
```

rules field are the validations on the field.
cross_field_validation is the validation cross multiple fileds.

NOTE: the custom validation function in cross_field_validation should be provided
      by the developer.


# Supported form fields

| HTML input  |
| ------------- | 
| text |
| email |
| password |
| radio |
| checkbox |
| select |
| date |
| file |
| number |
| time |
| range |
| textarea |


# i18n

field label can be used to display the form field name in the desired language.

