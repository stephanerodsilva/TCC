import React from 'react'
import IconButton from '../template/iconButton'

export default props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(users => (
            <tr key={users._id}>
                 <td className={''}>{users.username}</td>
                <td>
                    <IconButton style='danger' icon='trash-o'  
                        onClick={() => props.handleRemove(users)}></IconButton>
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Usuários Cadastrados</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}