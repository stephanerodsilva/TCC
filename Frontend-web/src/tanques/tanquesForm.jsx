import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {
    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            e.shiftKey ? props.handleSearch() : props.handleAdd()
        } else if (e.key === 'Escape') {
            props.handleClear()
        }
    }

    return (
        <div role='form' className='tanquesForm'>
            <Grid cols='12 9 10'>
                <input id='id_tanque' className='form-control'
                    placeholder='ID do tanque'
                    onChange={props.handleChangeid_tanque}
                    onKeyUp={keyHandler}
                    value={props.id_tanque}></input>

                  <input id='id_placa' className='form-control'
                    placeholder='Id da placa'
                    onChange={props.handleChangeid_placa}
                    onKeyUp={keyHandler}
                    value={props.id_placa}></input>

                    <input id='acelerometro' className='form-control'
                    placeholder='Acelerômetro'
                    onChange={props.handleChangeaceler}
                    onKeyUp={keyHandler}
                    value={props.acelerometro}></input>

                    <input id='temperatura_a' className='form-control'
                    placeholder='Temperatura da água'
                    onChange={props.handleChangetemp_a}
                    onKeyUp={keyHandler}
                    value={props.temperatura_a}></input>

                    <input id='temperatura_p' className='form-control'
                    placeholder='Temperatura da placa'
                    onChange={props.handleChangetemp_p}
                    onKeyUp={keyHandler}
                    value={props.temperatura_p}></input>

                    <input id='tensao' className='form-control'
                    placeholder='Sensor de tensão'
                    onChange={props.handleChangetens}
                    onKeyUp={keyHandler}
                    value={props.tensao}></input>

                    <input id='gas' className='form-control'
                    placeholder='Sensor de gás'
                    onChange={props.handleChangegas}
                    onKeyUp={keyHandler}
                    value={props.gas}></input>

                    <input id='luminosidade' className='form-control'
                    placeholder='Sensor de luminosidade'
                    onChange={props.handleChangelum}
                    onKeyUp={keyHandler}
                    value={props.luminosidade}></input>


            </Grid>
            <Grid cols='12 3 2'>
                <IconButton style='primary' icon='plus'
                    onClick={props.handleAdd}></IconButton>
                <IconButton style='info' icon='search'
                    onClick={props.handleSearch}></IconButton>
                <IconButton style='default' icon='close'
                    onClick={props.handleClear}></IconButton>
            </Grid>
        </div>
    )
}