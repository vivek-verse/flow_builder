import { useEffect } from "react";
import { Card, Select, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';

const { Option } = Select;

export const DynamicDropdown = (props: { parentCallback: Function, value : string, list : string[], card: boolean }): JSX.Element => {

    let handleChange = (value : string) => {
        props.parentCallback(value);
    }
    
    const list = props.list;

    useEffect(() => {
        props.parentCallback(list[0]);
    },[]);

    return (
        props.card ?
        <Card
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
        </Card> : 
        <Select defaultValue={ props.value } style={{ display:'flex', marginTop:'5px', width : 180 }} onChange={handleChange}>
            {
                list.map((item, i) => {
                    return <Option key = {i} value={item}>{item}</Option>
                })
            }
        </Select>)
}