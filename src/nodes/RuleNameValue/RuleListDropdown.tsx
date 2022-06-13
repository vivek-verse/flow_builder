import React, { useEffect, useState } from "react";
import { DiagramContext, DiagramContextInterface } from "../../components/DiagramContext";
import { Card, Select, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';

const { Option } = Select;

export const RuleListDropdown = (props: { parentCallback: Function }): JSX.Element => {
    const [value, setValue] = useState("");
    const { rulesList } = React.useContext(DiagramContext) as DiagramContextInterface;

    let handleChange = (value : string) => {
        props.parentCallback(value);
        setValue(value);
    }
    
    useEffect(() => {
        props.parentCallback(rulesList[0]);
    },[]);

    return (<Card
        style={{ width : 180 }}
        hoverable
        >
            <Skeleton loading={false} avatar active>
                <Meta
                    description="Select a rule"
                />
                <Select defaultValue={rulesList[0]} style={{ display:'flex', marginTop:'5px' }} onChange={handleChange}>
                    {
                        rulesList.map((item, i) => {
                            return <Option key = {i} value={item}>{item}</Option>

                        })
                    }
                </Select>
            </Skeleton>
    </Card>)
}