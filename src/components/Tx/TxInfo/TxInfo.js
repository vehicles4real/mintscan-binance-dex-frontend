import * as React from "react";
import styles from "./TxInfo.scss";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";
import moment from "moment";

import {setAgoTime, empty, _} from "src/lib/scripts";
import getTxTypeIcon from "src/constants/getTxTypeIcon";
import getTxType from "src/constants/getTxType";

//  components
import InfoRow from "src/components/common/InfoRow";

const successSVG = process.env.PUBLIC_URL + "/assets/transactions/success_ic.svg";
const failSVG = process.env.PUBLIC_URL + "/assets/transactions/fail_ic.svg";
const cx = cn.bind(styles);

export default function({txData}) {
	const value = txData?.messages?.[0]?.value;
	return (
		<div className={cx("TxInfo-wrapper")}>
			<h2 className={cx("title")}>Information</h2>
			<div className={cx("grid-wrapper")}>
				<InfoRow label='TxHash'>{txData.tx_hash}</InfoRow>
				<InfoRow label='Status'>
					<span>
						<img className={cx("status-img")} src={txData?.result ? successSVG : failSVG} alt={"status"} />
						{txData?.result ? "Success" : "fail"}
					</span>
				</InfoRow>
				<InfoRow label='Height'>
					<NavLink className={cx("blueColor")} to={`/blocks/${txData.height}`}>
						{txData.height}
					</NavLink>
				</InfoRow>
				<InfoRow label='Time'>
					<span>
						{setAgoTime(txData.timestamp)} ( {moment(txData.timestamp).format("YYYY-MM-DD HH:MM:ss")} )
					</span>
				</InfoRow>
			</div>
		</div>
	);
}
