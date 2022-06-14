import { useEffect, useState } from "react";
import { Card, Select, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';

const { Option } = Select;

export const DynamicDropdown = (props: { parentCallback: Function, value : string, list : string[] }): JSX.Element => {
    const [value, setValue] = useState("");

    let handleChange = (value : string) => {
        props.parentCallback(value);
        setValue(value);
    }
    
    const list = props.list;

    useEffect(() => {
        props.parentCallback(list[0]);
    },[]);

    return (<Card
        style={{ width : 180 }}
        hoverable
        >
            <Skeleton loading={false} avatar active>
                <Meta
                    description="Select a rule"
                />
                <Select defaultValue={ props.value } style={{ display:'flex', marginTop:'5px' }} onChange={handleChange}>
                    {
                        list.map((item, i) => {
                            return <Option key = {i} value={item}>{item}</Option>

                        })
                    }
                </Select>
            </Skeleton>
    </Card>)
}