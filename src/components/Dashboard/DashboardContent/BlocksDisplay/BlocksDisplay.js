import * as React from "react";
import cn from "classnames/bind";
import styles from "./BlocksDisplay.scss";
//  utils
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import useFetch from "src/hooks/useFetch/useFetch";
//  components
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import ErrorPage from "src/components/common/ErrorPage";
import TableWrapper from "src/components/Dashboard/TableWrapper";
import BlockDisplayTableRow from "./TableRow";

const cx = cn.bind(styles);

export default function(props) {
	const [data, requestFetch, setUrl] = useFetch(`${consts.API_BASE}${consts.API.BLOCKLIST}?limit=5`, "get");

	const tableHeaderRender = React.useMemo(() => {
		return (
			<TableHead>
				<TableRow>
					<TableCell className={cx("tableHeaderCell", "heightWidth")} align='left'>
						<span>Height</span>
					</TableCell>
					<TableCell className={cx("tableHeaderCell")} align='left'>
						Proposer
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "middleWidth")} align='right'>
						Txs
					</TableCell>
					<TableCell className={cx("tableHeaderCell", "timeWidth")} align='right'>
						<span>Time</span>
					</TableCell>
				</TableRow>
			</TableHead>
		);
	}, [data.data]);
	const tableBodyRender = React.useMemo(
		() => (
			<TableBody>
				{_.map(data?.data?.data, (v, i) => (
					<BlockDisplayTableRow key={i} blockData={v} />
				))}
			</TableBody>
		),
		[data.data]
	);

	return (
		<TableWrapper title={"BLOCKS"} type={1}>
			{data.error ? (
				<ErrorPage />
			) : (
				<Table className={cx("BlocksDisplay-table")}>
					{tableHeaderRender}
					{tableBodyRender}
				</Table>
			)}
		</TableWrapper>
	);
}