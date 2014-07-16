Ext
		.override(
				Ext.form.TextField,
				{
					filterKeys : function(e) {
						var k = e.getKey();
						if (Ext.isGecko
								&& (e.isNavKeyPress() || k == e.BACKSPACE || (k == e.DELETE && e.button == -1))) {
							return;
						}
						var c = e.getCharCode(), cc = String.fromCharCode(c);
						if (!Ext.isGecko && e.isSpecialKey() && !cc) {
							return;
						}
						if (!this.maskRe.test(cc)) {
							e.stopEvent();
						}
					}
				});

Ext.namespace('AD.view.common');

AD.view.common.Zipcode = Ext
		.extend(
				Ext.form.TextField,
				{
					vtype : 'numwithhyphen',
					enableKeyEvents : true,
					fieldLabel : 'Zip Code',
					maxLength : 10,
					listeners : {
						keydown : function(field, evt) {

							AD.view.common.Validations.validateCopyPaste(
									"Zip Code ", field, evt);

						},
						keyup : function(field, evt) {

							var value = field.getValue().toString();
							if (value.length > (field.maxLength - 1)) {
								field
										.setValue(value.slice(0, value.length
												- (value.length
														- field.maxLength + 1)));
							} else {
								field.setValue(value);
							}

						},
						blur : function(field) {
							if (field != null && field.getValue() != null
									&& field.getValue().length > 0) {
								if (field.getValue().length != 5
										&& field.getValue().length != 9) {
									field
											.markInvalid('Zip Code should be either in the format ##### or #####-####');
								}
							}
						}

					},
					initComponent : function(config) {
						Ext.apply(this, config);
						AD.view.common.Zipcode.superclass.initComponent
								.call(this);
					},
					setValue : function(value) {
						var modifiedValue = value.replace(/-/g, '');
						if (value.length > 5) {
							modifiedValue = value.substring(0, 5) + '-'
									+ value.substring(5, value.length);
						}
						AD.view.common.Zipcode.superclass.setValue.call(this,
								modifiedValue);

					},
					getValue : function() {
						var value = AD.view.common.Zipcode.superclass.getValue
								.call(this);
						if (value == undefined)
							return value;
						value = value.replace(/-/g, '');
						return value;
					},
					validateValue : function(value) {
						value = value.replace(/-/g, '');
						if (value.length > 0 && value.length != 5
								&& value.length != 9) {
							this
									.markInvalid('Zip Code should be either in the format ##### or #####-####');
							return false;
						} else {
							this.clearInvalid();
							return true;
						}
					}

				});


AD.view.common.CountryCombo = Ext
		.extend(
				Ext.form.ComboBox,
				{
					typeAhead : true,
					triggerAction : 'all',
					lazyRender : true,
					mode : 'local',
					forceSelection : true,
					value : 'USA',
					store : new Ext.data.ArrayStore(
							{

								fields : [ 'myId', 'displayText' ],
								data : [
										[ 'Afghanistan', 'AF - Afghanistan' ],
										[ 'Aringland Islands',
												'AX - Aringland Islands' ],
										[ 'Albania', 'AL - Albania' ],
										[ 'Algeria', 'DZ - Algeria' ],
										[ 'American Samoa', 'AS - American Samoa' ],
										[ 'Andorra', 'AD - Andorra' ],
										[ 'Angola', 'AO - Angola' ],
										[ 'Anguilla', 'AI - Anguilla' ],
										[ 'Antarctica', 'AQ - Antarctica' ],
										[ 'Antigua and Barbuda',
												'AG - Antigua and Barbuda' ],
										[ 'Argentina', 'AR - Argentina' ],
										[ 'Armenia', 'AM - Armenia' ],
										[ 'Aruba', 'AW - Aruba' ],
										[ 'Australia', 'AU - Australia' ],
										[ 'Austria', 'AT - Austria' ],
										[ 'Azerbaijan', 'AZ - Azerbaijan' ],
										[ 'Bahamas', 'BS - Bahamas' ],
										[ 'Bahrain', 'BH - Bahrain' ],
										[ 'Bangladesh', 'BD - Bangladesh' ],
										[ 'Barbados', 'BB - Barbados' ],
										[ 'Belarus', 'BY - Belarus' ],
										[ 'Belgium', 'BE - Belgium' ],
										[ 'Belize', 'BZ - Belize' ],
										[ 'Benin', 'BJ - Benin' ],
										[ 'Bermuda', 'BM - Bermuda' ],
										[ 'Bhutan', 'BT - Bhutan' ],
										[ 'Bolivia', 'BO - Bolivia' ],
										[ 'Bosnia and Herzegovina',
												'BA - Bosnia and Herzegovina' ],
										[ 'Botswana', 'BW - Botswana' ],
										[ 'Bouvet Island', 'BV - Bouvet Island' ],
										[ 'Brazil', 'BR - Brazil' ],
										[ 'British Indian Ocean territory',
												'IO - British Indian Ocean territory' ],
										[ 'Brunei Darussalam',
												'BN - Brunei Darussalam' ],
										[ 'Bulgaria', 'BG - Bulgaria' ],
										[ 'Burkina Faso', 'BF - Burkina Faso' ],
										[ 'Burundi', 'BI - Burundi' ],
										[ 'Cambodia', 'KH - Cambodia' ],
										[ 'Cameroon', 'CM - Cameroon' ],
										[ 'Canada', 'CA - Canada' ],
										[ 'Cape Verde', 'CV - Cape Verde' ],
										[ 'Cayman Islands', 'KY - Cayman Islands' ],
										[ 'Central African Republic',
												'CF - Central African Republic' ],
										[ 'Chad', 'TD - Chad' ],
										[ 'Chile', 'CL - Chile' ],
										[ 'China', 'CN - China' ],
										[ 'Christmas Island',
												'CX - Christmas Island' ],
										[ 'Cocos (Keeling) Islands',
												'CC - Cocos (Keeling) Islands' ],
										[ 'Colombia', 'CO - Colombia' ],
										[ 'Comoros', 'KM - Comoros' ],
										[ 'Congo', 'CG - Congo' ],
										[ 'Congo, Democratic Republic',
												'CD - Congo, Democratic Republic' ],
										[ 'Cook Islands', 'CK - Cook Islands' ],
										[ 'Costa Rica', 'CR - Costa Rica' ],
										[ 'Croatia (Hrvatska)',
												'HR - Croatia (Hrvatska)' ],
										[ 'Cuba', 'CU - Cuba' ],
										[ 'Cyprus', 'CY - Cyprus' ],
										[ 'Czech Republic', 'CZ - Czech Republic' ],
										[ 'Denmark', 'DK - Denmark' ],
										[ 'Djibouti', 'DJ - Djibouti' ],
										[ 'Dominica', 'DM - Dominica' ],
										[ 'Dominican Republic',
												'DO - Dominican Republic' ],
										[ 'East Timor', 'TL - East Timor' ],
										[ 'Ecuador', 'EC - Ecuador' ],
										[ 'Egypt', 'EG - Egypt' ],
										[ 'El Salvador', 'SV - El Salvador' ],
										[ 'Equatorial Guinea',
												'GQ - Equatorial Guinea' ],
										[ 'Eritrea', 'ER - Eritrea' ],
										[ 'Estonia', 'EE - Estonia' ],
										[ 'Ethiopia', 'ET - Ethiopia' ],
										[ 'Falkland Islands',
												'FK - Falkland Islands' ],
										[ 'Faroe Islands', 'FO - Faroe Islands' ],
										[ 'Fiji', 'FJ - Fiji' ],
										[ 'Finland', 'FI - Finland' ],
										[ 'France', 'FR - France' ],
										[ 'French Guiana', 'GF - French Guiana' ],
										[ 'French Polynesia',
												'PF - French Polynesia' ],
										[ 'French Southern Territories',
												'TF - French Southern Territories' ],
										[ 'Gabon', 'GA - Gabon' ],
										[ 'Gambia', 'GM - Gambia' ],
										[ 'Georgia', 'GE - Georgia' ],
										[ 'Germany', 'DE - Germany' ],
										[ 'Ghana', 'GH - Ghana' ],
										[ 'Gibraltar', 'GI - Gibraltar' ],
										[ 'Greece', 'GR - Greece' ],
										[ 'Greenland', 'GL - Greenland' ],
										[ 'Grenada', 'GD - Grenada' ],
										[ 'Guadeloupe', 'GP - Guadeloupe' ],
										[ 'Guam', 'GU - Guam' ],
										[ 'Guatemala', 'GT - Guatemala' ],
										[ 'Guinea', 'GN - Guinea' ],
										[ 'Guinea Bissau', 'GW - Guinea Bissau' ],
										[ 'Guyana', 'GY - Guyana' ],
										[ 'Haiti', 'HT - Haiti' ],
										[ 'Heard and McDonald Islands',
												'HM - Heard and McDonald Islands' ],
										[ 'Honduras', 'HN - Honduras' ],
										[ 'Hong Kong', 'HK - Hong Kong' ],
										[ 'Hungary', 'HU - Hungary' ],
										[ 'Iceland', 'IS - Iceland' ],
										[ 'India', 'IN - India' ],
										[ 'Indonesia', 'ID - Indonesia' ],
										[ 'Iran', 'IR - Iran' ],
										[ 'Iraq', 'IQ - Iraq' ],
										[ 'Ireland', 'IE - Ireland' ],
										[ 'Israel', 'IL - Israel' ],
										[ 'Italy', 'IT - Italy' ],
										[ 'Jamaica', 'JM - Jamaica' ],
										[ 'Japan', 'JP - Japan' ],
										[ 'Jordan', 'JO - Jordan' ],
										[ 'Kazakhstan', 'KZ - Kazakhstan' ],
										[ 'Kenya', 'KE - Kenya' ],
										[ 'Kiribati', 'KI - Kiribati' ],
										[ 'Korea (north)', 'KP - Korea (north)' ],
										[ 'Korea (south)', 'KR - Korea (south)' ],
										[ 'Kuwait', 'KW - Kuwait' ],
										[ 'Kyrgyzstan', 'KG - Kyrgyzstan' ],
										[ 'Lao Peoples Democratic Republic',
												'LA - Lao Peoples Democratic Republic' ],
										[ 'Latvia', 'LV - Latvia' ],
										[ 'Lebanon', 'LB - Lebanon' ],
										[ 'Lesotho', 'LS - Lesotho' ],
										[ 'Liberia', 'LR - Liberia' ],
										[ 'Libyan Arab Jamahiriya',
												'LY - Libyan Arab Jamahiriya' ],
										[ 'Liechtenstein', 'LI - Liechtenstein' ],
										[ 'Lithuania', 'LT - Lithuania' ],
										[ 'Luxembourg', 'LU - Luxembourg' ],
										[ 'Macao', 'MO - Macao' ],
										[
												'Macedonia, Former Yugoslav Republic Of',
												'MK - Macedonia, Former Yugoslav Republic Of' ],
										[ 'Madagascar', 'MG - Madagascar' ],
										[ 'Malawi', 'MW - Malawi' ],
										[ 'Malaysia', 'MY - Malaysia' ],
										[ 'Maldives', 'MV - Maldives' ],
										[ 'Mali', 'ML - Mali' ],
										[ 'Malta', 'MT - Malta' ],
										[ 'Marshall Islands',
												'MH - Marshall Islands' ],
										[ 'Martinique', 'MQ - Martinique' ],
										[ 'Mauritania', 'MR - Mauritania' ],
										[ 'Mauritius', 'MU - Mauritius' ],
										[ 'Mayotte', 'YT - Mayotte' ],
										[ 'Mexico', 'MX - Mexico' ],
										[ 'Micronesia', 'FM - Micronesia' ],
										[ 'Moldova', 'MD - Moldova' ],
										[ 'Monaco', 'MC - Monaco' ],
										[ 'Mongolia', 'MN - Mongolia' ],
										[ 'Montenegro', 'ME - Montenegro' ],
										[ 'Montserrat', 'MS - Montserrat' ],
										[ 'Morocco', 'MA - Morocco' ],
										[ 'Mozambique', 'MZ - Mozambique' ],
										[ 'Myanmar', 'MM - Myanmar' ],
										[ 'Namibia', 'NA - Namibia' ],
										[ 'Nauru', 'NR - Nauru' ],
										[ 'Nepal', 'NP - Nepal' ],
										[ 'Netherlands', 'NL - Netherlands' ],
										[ 'Netherlands Antilles',
												'AN - Netherlands Antilles' ],
										[ 'New Caledonia', 'NC - New Caledonia' ],
										[ 'New Zealand', 'NZ - New Zealand' ],
										[ 'Nicaragua', 'NI - Nicaragua' ],
										[ 'Niger', 'NE - Niger' ],
										[ 'Nigeria', 'NG - Nigeria' ],
										[ 'Niue', 'NU - Niue' ],
										[ 'Norfolk Island', 'NF - Norfolk Island' ],
										[ 'Northern Mariana Islands',
												'MP - Northern Mariana Islands' ],
										[ 'Norway', 'NO - Norway' ],
										[ 'Oman', 'OM - Oman' ],
										[ 'Pakistan', 'PK - Pakistan' ],
										[ 'Palau', 'PW - Palau' ],
										[ 'Palestinian Territories',
												'PS - Palestinian Territories' ],
										[ 'Panama', 'PA - Panama' ],
										[ 'Papua New Guinea',
												'PG - Papua New Guinea' ],
										[ 'Paraguay', 'PY - Paraguay' ],
										[ 'Peru', 'PE - Peru' ],
										[ 'Philippines', 'PH - Philippines' ],
										[ 'Pitcairn', 'PN - Pitcairn' ],
										[ 'Poland', 'PL - Poland' ],
										[ 'Portugal', 'PT - Portugal' ],
										[ 'Puerto Rico', 'PR - Puerto Rico' ],
										[ 'Qatar', 'QA - Qatar' ],
										[ 'Reacuteunion', 'RE - Reacute union' ],
										[ 'Romania', 'RO - Romania' ],
										[ 'Russian Federation',
												'RU - Russian Federation' ],
										[ 'Rwanda', 'RW - Rwanda' ],
										[ 'Saint Helena', 'SH - Saint Helena' ],
										[ 'Saint Kitts and Nevis',
												'KN - Saint Kitts and Nevis' ],
										[ 'Saint Lucia', 'LC - Saint Lucia' ],
										[ 'Saint Pierre and Miquelon',
												'PM - Saint Pierre and Miquelon' ],
										[ 'Saint Vincent and the Grenadines',
												'VC - Saint Vincent and the Grenadines' ],
										[ 'Samoa', 'WS - Samoa' ],
										[ 'San Marino', 'SM - San Marino' ],
										[ 'Sao Tome and Principe',
												'ST - Sao Tome and Principe' ],
										[ 'Saudi Arabia', 'SA - Saudi Arabia' ],
										[ 'Senegal', 'SN - Senegal' ],
										[ 'Serbia', 'RS - Serbia' ],
										[ 'Seychelles', 'SC - Seychelles' ],
										[ 'Sierra Leone', 'SL - Sierra Leone' ],
										[ 'Singapore', 'SG - Singapore' ],
										[ 'Slovakia', 'SK - Slovakia' ],
										[ 'Slovenia', 'SI - Slovenia' ],
										[ 'Solomon Islands', 'SB - Solomon Islands' ],
										[ 'Somalia', 'SO - Somalia' ],
										[ 'South Africa', 'ZA - South Africa' ],
										[
												'South Georgia and the South Sandwich Islands',
												'GS - South Georgia and the South Sandwich Islands' ],
										[ 'Spain', 'ES - Spain' ],
										[ 'Sri Lanka', 'LK - Sri Lanka' ],
										[ 'Sudan', 'SD - Sudan' ],
										[ 'Suriname', 'SR - Suriname' ],
										[ 'Svalbard and Jan Mayen Islands',
												'SJ - Svalbard and Jan Mayen Islands' ],
										[ 'Swaziland', 'SZ - Swaziland' ],
										[ 'Sweden', 'SE - Sweden' ],
										[ 'Switzerland', 'CH - Switzerland' ],
										[ 'Syria', 'SY - Syria' ],
										[ 'Taiwan', 'TW - Taiwan' ],
										[ 'Tajikistan', 'TJ - Tajikistan' ],
										[ 'Tanzania', 'TZ - Tanzania' ],
										[ 'Thailand', 'TH - Thailand' ],
										[ 'Togo', 'TG - Togo' ],
										[ 'Tokelau', 'TK - Tokelau' ],
										[ 'Tonga', 'TO - Tonga' ],
										[ 'Trinidad and Tobago',
												'TT - Trinidad and Tobago' ],
										[ 'Tunisia', 'TN - Tunisia' ],
										[ 'Turkey', 'TR - Turkey' ],
										[ 'Turkmenistan', 'TM - Turkmenistan' ],
										[ 'Turks and Caicos Islands',
												'TC - Turks and Caicos Islands' ],
										[ 'Tuvalu', 'TV - Tuvalu' ],
										[ 'Uganda', 'UG - Uganda' ],
										[ 'Ukraine', 'UA - Ukraine' ],
										[ 'United Arab Emirates',
												'AE - United Arab Emirates' ],
										[ 'United Kingdom', 'GB - United Kingdom' ],
										[ 'USA', 'US - United States' ],
										[ 'Uruguay', 'UY - Uruguay' ],
										[ 'Uzbekistan', 'UZ - Uzbekistan' ],
										[ 'Vanuatu', 'VU - Vanuatu' ],
										[ 'Vatican City', 'VA - Vatican City' ],
										[ 'Venezuela', 'VE - Venezuela' ],
										[ 'Vietnam', 'VN - Vietnam' ],
										[ 'Virgin Islands (British)',
												'VG - Virgin Islands (British)' ],
										[ 'Virgin Islands (US)',
												'VI - Virgin Islands (US)' ],
										[ 'Wallis and Futuna Islands',
												'WF - Wallis and Futuna Islands' ],
										[ 'Western Sahara', 'EH - Western Sahara' ],
										[ 'Yemen', 'YE - Yemen' ],
										[ 'Zaire', 'CD - Zaire' ],
										[ 'Zambia', 'ZM - Zambia' ],
										[ 'Zimbabwe', 'ZW - Zimbabwe' ]

								]

							}),
					valueField : 'myId',
					displayField : 'displayText',
					initComponent : function(config) {
						Ext.apply(this, config);
						AD.view.common.CountryCombo.superclass.initComponent
								.call(this);
					}

				});

Ext.reg('common.countrycombo', AD.view.common.CountryCombo);

Ext.namespace('AD.view.common');

AD.view.common.StateCombo = Ext.extend(Ext.form.ComboBox, {
	typeAhead : true,
	triggerAction : 'all',
	forceSelection : true,
	editable : true,
	lazyRender : true,
	mode : 'local',
	width : 170,
	store : new Ext.data.ArrayStore({

		fields : [ 'myId', 'displayText' ],
		data : [ [ 'AL', 'AL - Alabama' ], [ 'AK', 'AK - Alaska' ],
				[ 'AZ', 'AZ - Arizona' ], [ 'AR', 'AR - Arkansas' ],
				[ 'CA', 'CA - California' ], [ 'CO', 'CO - Colorado' ],
				[ 'CT', 'CT - Connecticut' ], [ 'DE', 'DE - Delaware' ],
				[ 'DC', 'DC - District of Columbia' ],
				[ 'FL', 'FL - Florida' ], [ 'GA', 'GA - Georgia' ],
				[ 'HI', 'HI - Hawaii' ], [ 'ID', 'ID - Idaho' ],
				[ 'IL', 'IL - Illinois' ], [ 'IN', 'IN - Indiana' ],
				[ 'IA', 'IA - Iowa' ], [ 'KS', 'KS - Kansas' ],
				[ 'KY', 'KY - Kentucky' ], [ 'LA', 'LA - Louisiana' ],
				[ 'ME', 'ME - Maine' ], [ 'MD', 'MD - Maryland' ],
				[ 'MA', 'MA - Massachusetts' ], [ 'MI', 'MI - Michigan' ],
				[ 'MN', 'MN - Minnesota' ], [ 'MS', 'MS - Mississippi' ],
				[ 'MO', 'MO - Missouri' ], [ 'MT', 'MT - Montana' ],
				[ 'NE', 'NE - Nebraska' ], [ 'NV', 'NV - Nevada' ],
				[ 'NH', 'NH - New Hampshire' ], [ 'NJ', 'NJ - New Jersey' ],
				[ 'NM', 'NM - New Mexico' ], [ 'NY', 'NY - New York' ],
				[ 'NC', 'NC - North Carolina' ], [ 'ND', 'ND - North Dakota' ],
				[ 'OH', 'OH - Ohio' ], [ 'OK', 'OK - Oklahoma' ],
				[ 'OR', 'OR - Oregon' ], [ 'PA', 'PA - Pennsylvania' ],
				[ 'RI', 'RI - Rhode Island' ], [ 'SC', 'SC - South Carolina' ],
				[ 'SD', 'SD - South Dakota' ], [ 'TN', 'TN - Tennessee' ],
				[ 'TX', 'TX - Texas' ], [ 'UT', 'UT - Utah' ],
				[ 'VT', 'VT - Vermont' ], [ 'VA', 'VA - Virginia' ],
				[ 'WA', 'WA - Washington' ], [ 'WV', 'WV - West Virginia' ],
				[ 'WI', 'WI - Wisconsin' ], [ 'WY', 'WY - Wyoming' ] ]

	}),
	valueField : 'myId',
	displayField : 'displayText',
	selectOnFocus : true,
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.StateCombo.superclass.initComponent.call(this);
	}

});

Ext.reg('common.statecombo', AD.view.common.StateCombo);

AD.view.common.DateField = Ext.extend(Ext.form.DateField, {
	vtype : 'numwithslash',
	enableKeyEvents : true,
	listeners : {
		keydown : function(field, evt) {

			AD.view.common.Validations.validateCopyPaste("Date Field ", field,
					evt);

		}
	},
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.DateField.superclass.initComponent.call(this);
	}

});
Ext.reg('common.datefield', AD.view.common.DateField);

AD.view.common.FirstName = Ext.extend(Ext.form.TextField, {
	vtype : 'alphawithspacehyphen',
	enableKeyEvents : true,
	listeners : {
		keydown : function(field, evt) {

			AD.view.common.Validations.validateCopyPaste("First Name ", field,
					evt);

		}
	},
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.FirstName.superclass.initComponent.call(this);
	}

});
Ext.reg('common.firstname', AD.view.common.FirstName);

AD.view.common.NumberField = Ext.extend(Ext.form.NumberField, {
	listeners : {
		keydown : function(field, evt) {

			AD.view.common.Validations.validateCopyPaste("Number field ",
					field, evt);

		}
	},
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.NumberField.superclass.initComponent.call(this);
	}

});
Ext.reg('common.numberfield', AD.view.common.NumberField);

AD.view.common.PhoneField = Ext
		.extend(
				Ext.form.TextField,
				{
					vtype : 'numwithhyphen',
					enableKeyEvents : true,
					maxLength : 12,
					listeners : {
						keydown : function(field, evt) {

							AD.view.common.Validations.validateCopyPaste(
									"Phone field ", field, evt);

						},
						keyup : function(field, evt) {
							var value = field.getValue().toString();
							if (value.length > (field.maxLength - 2)) {
								field
										.setValue(value.slice(0, value.length
												- (value.length
														- field.maxLength + 2)));
							} else {
								field.setValue(value);
							}

						},
						blur : function(field) {
							if (field != null && field.getValue() != null
									&& field.getValue().length > 0) {
								if (field.getValue().length != 10) {
									field
											.markInvalid('Phone number should contain exactly 10 digits');
								}
							}
						}
					},
					initComponent : function(config) {
						Ext.apply(this, config);
						AD.view.common.PhoneField.superclass.initComponent
								.call(this);
					},
					setValue : function(value) {
						var modifiedValue = value.replace(/-/g, '');
						if (value.length > 3 && value.length <= 6) {
							modifiedValue = value.substring(0, 3) + '-'
									+ value.substring(3, value.length);
						} else if (value.length > 6) {
							modifiedValue = value.substring(0, 3) + '-'
									+ value.substring(3, 6) + '-'
									+ value.substring(6, value.length);
						}
						AD.view.common.PhoneField.superclass.setValue.call(
								this, modifiedValue);

					},
					getValue : function() {
						var value = AD.view.common.PhoneField.superclass.getValue
								.call(this);
						if (value == undefined)
							return value;
						value = value.replace(/-/g, '');
						return value;
					}

				});
Ext.reg('common.phonefield', AD.view.common.PhoneField);


AD.view.common.City = Ext.extend(Ext.form.TextField, {
	vtype : 'alphawithspace',
	enableKeyEvents : true,
	listeners : {
		keydown : function(field, evt) {

			AD.view.common.Validations.validateCopyPaste("City ", field, evt);

		}
	},
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.City.superclass.initComponent.call(this);
	}

});
Ext.reg('common.city', AD.view.common.City);

AD.view.common.StreetNumber = Ext.extend(Ext.form.TextField, {
	vtype : 'alphanumwithdash',
	enableKeyEvents : true,
	listeners : {
		keydown : function(field, evt) {

			AD.view.common.Validations.validateCopyPaste("Street Number ",
					field, evt);

		}
	},
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.StreetNumber.superclass.initComponent.call(this);
	}

});
Ext.reg('common.streetnumber', AD.view.common.StreetNumber);

AD.view.common.StreetDirection = Ext.extend(Ext.form.TextField, {
	vtype : 'direction',
	enableKeyEvents : true,
	listeners : {
		keydown : function(field, evt) {

			AD.view.common.Validations.validateCopyPaste("Street Direction ",
					field, evt);

		}
	},
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.StreetDirection.superclass.initComponent.call(this);
	}

});
Ext.reg('common.streetdirection', AD.view.common.StreetDirection);

AD.view.common.StreetName = Ext.extend(Ext.form.TextField, {
	vtype : 'alphanumspacewithdash',
	enableKeyEvents : true,
	listeners : {
		keydown : function(field, evt) {

			AD.view.common.Validations.validateCopyPaste("Street Name ",
					field, evt);

		}
	},
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.StreetName.superclass.initComponent.call(this);
	}

});
Ext.reg('common.streetname', AD.view.common.StreetName);

AD.view.common.StreetSubtitle = Ext.extend(Ext.form.TextField, {
	vtype : 'alphanum',
	enableKeyEvents : true,
	quickTipText : 'Street Subtitle Field should contain Street, Avenue, Blvd, Parkway, etc.',
	listeners : {
		keydown : function(field, evt) {

			AD.view.common.Validations.validateCopyPaste("Street Subtitle ",
					field, evt);

		},
		render : function(component) {
			Ext.QuickTips.register({
		        target: component.getEl(),
		        text: component.quickTipText
		      });
		}
	},
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.StreetSubtitle.superclass.initComponent.call(this);
	}

});
Ext.reg('common.streetsubtitle', AD.view.common.StreetSubtitle);

AD.view.common.StreetSubDescription = Ext.extend(Ext.form.TextField, {
	vtype : 'alphanumwithspace',
	enableKeyEvents : true,
	quickTipText : 'Subdescription Field should contain Floor and number, Suite and number, Room and number or description .',
	listeners : {
		keydown : function(field, evt) {

			AD.view.common.Validations.validateCopyPaste("Sub description ",
					field, evt);			

		},
		keyup:function(field,evt){
			var value=field.getValue();
			var whiteSpaceCount=0;
			for (var i = 0; i < value.length; i++) {
		        if (value[i] == " ") {
		        	whiteSpaceCount++;
		        }
		    }

			if(whiteSpaceCount > 1){
				Ext.MessageBox.show({
					title: 'Error', msg: "Only one space is allowed to enter",
					width: 200, 
					buttons: Ext.MessageBox.OK, 
					fn:function(){
						field.setValue(value.substring(0,value.length-1));
						field.focus(false,100);
					},
					icon: Ext.MessageBox.ERROR, 
					closable: false
				});
				
			}
		},
		render : function(component) {
			Ext.QuickTips.register({
		        target: component.getEl(),
		        text: component.quickTipText
		      });
		}
	},
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.StreetSubDescription.superclass.initComponent
				.call(this);
	}

});
Ext.reg('common.streetsubdescription', AD.view.common.StreetSubDescription);



AD.view.common.CompanyName = Ext.extend(Ext.form.TextField, {
	vtype : 'companyname',
	enableKeyEvents : true,
	readOnly:true,
	listeners : {
		keydown : function(field, evt) {

			AD.view.common.Validations.validateCopyPaste("Company Name ",
					field, evt);

		}
	},
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.CompanyName.superclass.initComponent.call(this);
	}

});
Ext.reg('common.companyname', AD.view.common.CompanyName);


AD.view.common.EmailField = Ext.extend(Ext.form.TextField, {
	vtype : 'email',
	enableKeyEvents : true,
	listeners : {
		keydown : function(field, evt) {

			AD.view.common.Validations.validateCopyPaste("Email field ",
					field, evt);

		}
	},
	initComponent : function(config) {
		Ext.apply(this, config);
		AD.view.common.EmailField.superclass.initComponent.call(this);
	}

});
Ext.reg('common.email', AD.view.common.EmailField);


AD.view.common.RadioGroupComponent = Ext.extend(Ext.form.RadioGroup,
		{

			getValue : function() {
				if( this.getEl() != undefined ){
					return Ext.DomQuery.selectValue('input[name=' + this.name
							+ ']:checked/@value', this.getEl().dom);
				}else{
					return null;
				}
				
			},
			initComponent : function(config) {
				Ext.apply(this, config);
				AD.view.common.RadioGroupComponent.superclass.initComponent
						.call(this);
			}

		});
Ext.reg('common.radiogroup', AD.view.common.RadioGroupComponent);
