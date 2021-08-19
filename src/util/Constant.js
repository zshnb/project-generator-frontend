const databaseConfigs = {
  mysql: {
    jdbcHost: 'localhost',
    jdbcPort: 3306,
    jdbcUser: 'root',
    jdbcPassword: 'root',
  },
  sqlserver: {
    jdbcHost: 'localhost',
    jdbcPort: 1433,
    jdbcUser: 'sa',
    jdbcPassword: 'root',
  }
}

const formItemClassNames = {
  inputFormItem: 'com.zshnb.projectgenerator.generator.entity.web.InputFormItem',
  passwordFormItem: 'com.zshnb.projectgenerator.generator.entity.web.PasswordFormItem',
  dateTimeFormItem: 'com.zshnb.projectgenerator.generator.entity.web.DateTimeFormItem',
  dateFormItem: 'com.zshnb.projectgenerator.generator.entity.web.DateFormItem',
  radioFormItem: 'com.zshnb.projectgenerator.generator.entity.web.RadioFormItem',
  textAreaFormItem: 'com.zshnb.projectgenerator.generator.entity.web.TextAreaFormItem',
  selectFormItem: 'com.zshnb.projectgenerator.generator.entity.web.SelectFormItem',
  fileFormItem: 'com.zshnb.projectgenerator.generator.entity.web.FileFormItem',
  imageFormItem: 'com.zshnb.projectgenerator.generator.entity.web.ImageFormItem',
}

const frameItemClassNames = {
  textFieldFrameItem: 'com.zshnb.projectgenerator.generator.entity.swing.TextFieldFrameItem',
  passwordFrameItem: 'com.zshnb.projectgenerator.generator.entity.swing.PasswordFrameItem',
  radioFrameItem: 'com.zshnb.projectgenerator.generator.entity.swing.RadioFrameItem',
  selectFrameItem: 'com.zshnb.projectgenerator.generator.entity.swing.SelectFrameItem',
}

export {
  databaseConfigs,
  formItemClassNames,
  frameItemClassNames
}
