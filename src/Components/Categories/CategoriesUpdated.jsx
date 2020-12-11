import React from "react";
import styled from "styled-components";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/core/Link";

const Wrapper = styled.div`
  width: 100%;
  text-align: left;
`;

const CategoryWrapper = styled.div`
  font-size: 14px;
  width: 100%;
  .category {
    display: grid;
    grid-template-columns: 50% auto;
    margin: 15px 0;
    line-height: 20px;
  }
  .title {
    font-weight: 500;
    padding-right: 24px;
  }
  .value {
    font-weight: normal;
    text-align: left;
  }
`;

const SecondaryExpansionPanel = withStyles({
  root: {
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: 0
    }
  },
  expanded: {}
})(ExpansionPanel);

const SecondarySummaryPanel = withStyles({
  root: {
    minHeight: 0,
    padding: 0,
    margin: 0,
    display: "inline-flex",
    color: "#888888",
    fontSize: 15,
    textTransform: "uppercase",
    "&$expanded": {
      minHeight: 0
    }
  },
  content: {
    margin: 0,
    "&$expanded": {
      margin: 0
    }
  },
  expandIcon: {
    padding: 8
  },
  expanded: {}
})(ExpansionPanelSummary);

const useStyles = makeStyles({
  mainDetailsPanel: {
    display: "block",
    padding: "8px 24px 24px 0"
  },
  secondaryDetailsPanel: {
    padding: 0
  },
  mainSummaryPanel: {
    margin: 0,
    padding: "0 24px 0 0",
    fontWeight: 500,
    fontSize: 20
  }
});

function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

function validateURL(url) {
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
  return regex.test(String(url).toLowerCase());
}

const CategoriesUpdated = ({ categoryData }) => {
  const classes = useStyles();

  return (
    <Wrapper>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{ root: classes.mainSummaryPanel }}
        >
          Administrative Categories
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.mainDetailsPanel }}>
          <SecondaryExpansionPanel defaultExpanded>
            <SecondarySummaryPanel expandIcon={<ExpandMoreIcon />}>
              Contact
            </SecondarySummaryPanel>
            <ExpansionPanelDetails
              classes={{ root: classes.secondaryDetailsPanel }}
            >
              <CategoryWrapper>
                {categoryData.admin.map(({ title, value }, index) => (
                  <div className="category" key={index}>
                    <>
                      <span className="title">
                        {title
                          .replaceAll("_dot_", ".")
                          .replaceAll("_dash_", "-")}
                      </span>
                      <span className="value">
                        {validateEmail(value) || validateURL(value) ? (
                          validateEmail(value) ? (
                            <Link href={"mailto:" + value}> {value} </Link>
                          ) : (
                            <Link target="_blank" href={value}>
                              {" "}
                              {value}{" "}
                            </Link>
                          )
                        ) : (
                          value
                        )}
                      </span>
                    </>
                  </div>
                ))}
              </CategoryWrapper>
            </ExpansionPanelDetails>
          </SecondaryExpansionPanel>
          <SecondaryExpansionPanel defaultExpanded>
            <SecondarySummaryPanel expandIcon={<ExpandMoreIcon />}>
              Social Media
            </SecondarySummaryPanel>
            <ExpansionPanelDetails
              classes={{ root: classes.secondaryDetailsPanel }}
            >
              <CategoryWrapper>
                {categoryData.admin.map(({ title, value }, index) => (
                  <div className="category" key={index}>
                    <>
                      <span className="title">
                        {title
                          .replaceAll("_dot_", ".")
                          .replaceAll("_dash_", "-")}
                      </span>
                      <span className="value">
                        {validateEmail(value) || validateURL(value) ? (
                          validateEmail(value) ? (
                            <Link target="_blank" href={"mailto:" + value}>
                              {" "}
                              {value}{" "}
                            </Link>
                          ) : (
                            <Link target="_blank" href={value}>
                              {" "}
                              {value}{" "}
                            </Link>
                          )
                        ) : (
                          value
                        )}
                      </span>
                    </>
                  </div>
                ))}
              </CategoryWrapper>
            </ExpansionPanelDetails>
          </SecondaryExpansionPanel>
          <SecondaryExpansionPanel defaultExpanded>
            <SecondarySummaryPanel expandIcon={<ExpandMoreIcon />}>
              Organization Information
            </SecondarySummaryPanel>
            <ExpansionPanelDetails
              classes={{ root: classes.secondaryDetailsPanel }}
            >
              <CategoryWrapper>
                {categoryData.admin.map(({ title, value }, index) => (
                  <div className="category" key={index}>
                    <>
                      <span className="title">
                        {title
                          .replaceAll("_dot_", ".")
                          .replaceAll("_dash_", "-")}
                      </span>
                      <span className="value">
                        {validateEmail(value) || validateURL(value) ? (
                          validateEmail(value) ? (
                            <Link target="_blank" href={"mailto:" + value}>
                              {" "}
                              {value}{" "}
                            </Link>
                          ) : (
                            <Link target="_blank" href={value}>
                              {" "}
                              {value}{" "}
                            </Link>
                          )
                        ) : (
                          value
                        )}
                      </span>
                    </>
                  </div>
                ))}
              </CategoryWrapper>
            </ExpansionPanelDetails>
          </SecondaryExpansionPanel>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Wrapper>
  );
};

export default CategoriesUpdated;
