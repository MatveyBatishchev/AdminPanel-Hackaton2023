import React from 'react';
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin'

interface props {
    id: string;
}

const News = (props) => {
    return (
        <List {...props}>
            {
                <Datagrid>
                    <TextField source='id' />
                    <TextField source='name' />
                    <TextField source='description' />
                    <EditButton basePath='/news'/>
                    <DeleteButton basePath='/news'/>
                </Datagrid>
            }

        </List>
    );
};

export default News;