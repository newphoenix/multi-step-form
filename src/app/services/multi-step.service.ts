import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiStepService {

  constructor() { }

  getMultiStepModel() {

    return of({
      steps: {

        user_info: {
          title: "User Info",
          fields: {
            username: {
              value: '', label: 'Username', type: 'text',
              rules: {
                required: true,
                minLength: 4,
              }
            },
            email: {
              value: '', label: 'Email', type: 'email',
              rules: {
                required: true,
                email: 'email',
              }
            },
            secondary_email: {
              value: '', label: 'Secondary Email', type: 'email',
              rules: {
                required: true,
                pattern: { regex: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, msg: 'Please enter correct email address' },
              }
            },
          }
        },

        password: {
          title: "Password",
          fields: {
            password: {
              value: '', label: 'Password', type: 'password',
              rules: {
                required: true,
                minLength: 8,
              }
            },
            repassword: {
              value: '', label: 'Confirm Password', type: 'password',
              rules: {
                required: true,
                minLength: 8,
              }
            }
          },
          cross_field_validation:
            [{ function: "match", parameters: ['password', 'repassword', 'mismatch'], inputs: ['password', 'repassword'], errorName: 'mismatch', errorMsg: "Passwords should match" }]

        },

        business_info: {
          title: "Business Info",
          fields: {
            typeBussines: {
              value: null,
              label: "Bussines Type",
              type: "radio",
              options: [
                { label: "Enterprise", value: "1500" },
                { label: "Home", value: "6" },
                { label: "Personal", value: "1" }],
              rules: {
                required: true,
              }
            },
            newsletterIn: {
              value: null,
              label: "Subscribe to newsletter",
              type: "checkbox",
              options: [
                { label: "Enterprise", value: false, id: "Enterprise" },
                { label: "Home", value: false, id: "Home" },
                { label: "Personal", value: false, id: "Personal" }],
              rules: {
                required: true,
              }

            },
            subscriptionType: {
              label: "Subscription Type",
              value: "",
              type: "select",
              options: [
                { label: "Pick one", value: "" },
                { label: "Premium", value: "premium" },
                { label: "Basic", value: "basic" }
              ],
              rules: {
                required: true
              }
            }
          }
        },

        job_info: {
          title: "Job Info",
          fields: {
            start_date: {
              value: '', label: 'Starting date', type: 'date',
              rules: {
                required: true
              }
            },
            cv: {
              value: '', label: 'CV', type: 'file',
              rules: {
                required: true
              }
            },
            motivatoin: {
              value: '', label: 'Motivation letter', type: 'file',
              rules: {
                required: true
              }
            },
            notice_period: {
              value: '', label: 'Notice period (Weeks)', type: 'number',
              rules: {
                required: true
              }
            },
          }
        },

        additional_info: {
          title: "Addtional Info",
          fields: {
            meeting_time: {
              value: '', label: 'Meeting time', type: 'time',
              rules: {
                required: true
              }
            },
            reward: {
              array: true, value: '', label: 'Rewards', type: 'text'
            },
            contact: {
              value: '', label: 'Contact', type: 'textarea',
              rules: {
                required: true
              }
            }
          }
        }

      }
    });

  }

}
