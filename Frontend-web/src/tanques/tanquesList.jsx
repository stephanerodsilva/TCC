import React from 'react'
import IconButton from '../template/iconButton'

export default props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(tanques => (
            <tr key={tanques._id}>
                 <td className={''} >{tanques.createdAt}</td>
                 <td className={''}>{tanques.s_acelerometro}</td>
                 <td className={''}>{tanques.s_temperatura_a}</td>
                 <td className={''}>{tanques.s_temperatura_p}</td>
                 <td className={''}>{tanques.s_tensao}</td>
                 <td className={''}>{tanques.s_gas}</td>
                 <td className={''}>{tanques.s_luminosidade}</td>
                <td>
                    <IconButton style='danger' icon='trash-o'  
                        onClick={() => props.handleRemove(tanques)}></IconButton>
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>                
                <tr>
                    <th>Data</th>
                    <th>Acelerômetro</th>
                    <th>Temp Água</th>
                    <th>Temp Placa</th>
                    <th>Tensão</th>
                    <th>Gás</th>
                    <th>Luminosidade</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}