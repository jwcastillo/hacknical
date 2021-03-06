import React from 'react';
import cx from 'classnames';
import { IconButton, InputGroup, InputGroupV2 } from 'light-ui';
import WritableList from 'COMPONENTS/WritableList';
import styles from '../../../styles/resume.css';
import locales from 'LOCALES';

const resumeTexts = locales('resume.sections.workExperiences');

class WorkProject extends React.Component {
  constructor(props) {
    super(props);
    this.addDetail = this.addDetail.bind(this);
    this.deleteDetail = this.deleteDetail.bind(this);
    this.changeDetail = this.changeDetail.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
  }

  addDetail(detail) {
    const { project, onChange } = this.props;
    onChange && onChange({
      details: [...project.details, detail]
    });
  }

  deleteDetail(index) {
    const { project, onChange } = this.props;
    const { details } = project;
    onChange && onChange({
      details: [...details.slice(0, index), ...details.slice(index + 1)]
    });
  }

  changeDetail(detail, index) {
    const { project, onChange } = this.props;
    const { details } = project;
    onChange && onChange({
      details: [...details.slice(0, index), detail, ...details.slice(index + 1)]
    });
  }

  handleProjectChange(type) {
    const { onChange } = this.props;
    return (value) => {
      onChange && onChange({ [type]: value })
    };
  }

  render() {
    const { project, onDelete, disabled } = this.props;
    return (
      <div className={styles.project_container}>
        <div className={styles.project_name_wrapper}>
          <InputGroup
            theme="flat"
            value={project.name}
            disabled={disabled}
            className={styles.last_input}
            placeholder={resumeTexts.projectName}
            onChange={this.handleProjectChange('name')}
            tipsoStyle={{
              left: '0',
              transform: 'translateX(0)'
            }}
            wrapperClassName={cx(styles.input_group, styles.single_input)}
          >
            <InputGroupV2
              sections={[
                {
                  value: 'http://',
                  disabled: true,
                  style: {
                    width: 50,
                    padding: '0 5px'
                  }
                },
                {
                  disabled,
                  type: 'url',
                  value: project.url.replace(/^https?:\/\//, ''),
                  placeholder: resumeTexts.projectHomepage,
                  onChange: this.handleProjectChange('url'),
                }
              ]}
              style={{
                margin: 0
              }}
              theme="underline"
            />
          </InputGroup>
          <IconButton
            color="red"
            icon="trash-o"
            className={styles.resume_delete}
            onClick={onDelete}
          />
          
        </div>
        <WritableList
          placeholder={resumeTexts.addProjectDesc}
          defaultIntro={resumeTexts.introText}
          introList={resumeTexts.introList}
          items={project.details}
          onAdd={this.addDetail}
          onDelete={this.deleteDetail}
          onChange={this.changeDetail}
        />
      </div>
    );
  }
}

export default WorkProject;
