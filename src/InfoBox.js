import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
import { prettyPrintStat } from "./util";

function InfoBox({
  title,
  cases,
  isRed,
  isGreen,
  isBlack,
  active,
  total,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infobox ${active && isRed && "infobox--red"} ${
        active && isGreen && "infobox--green"
      } ${active && isBlack && "infobox--black"}`}
    >
      <CardContent>
        <Typography className="infobox__title">{title}</Typography>
        <h2
          className={`infobox__cases ${isRed && "infocases--red"} ${
            isGreen && "infocases--green"
          } ${isBlack && "infocases--black"}`}
        >
          {prettyPrintStat(cases)}
        </h2>
        <Typography className="infobox__total" color="textSecondary">
          {prettyPrintStat(total)} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;