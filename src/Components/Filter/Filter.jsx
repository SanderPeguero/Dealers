import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';
import { useContextCar } from '../../Context/Context';
import { GetItemsCarDetails } from '../../Functions/Sales/Sales';
import SelectL from '../Select/Select';

const FilterComponent = () => {
  const { ListCar } = useContextCar();

  const [Search, setSearch] = useState('');
  const [YearDesde, setYearDesde] = useState('');
  const [YearHasta, setYearHasta] = useState('');
  const [Marca, setMarca] = useState('');
  const [Modelo, setModelo] = useState('');

  const [Todos, setTodos] = useState(true);
  const [Nuevo, setNuevo] = useState(false);
  const [Usado, setUsado] = useState(false);

  const [values, setValues] = useState([0, 100000]);
  const min = 0;
  const max = 100000;

  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    // Obtener marcas únicas disponibles en ListCar y adaptarlas para react-select
    const brands = [...new Set(ListCar.map(car => car.Sale.CarDetails.Brand))].map(brand => ({
      value: brand,
      label: brand,
    }));
    setAvailableBrands(brands);

    // Obtener modelos disponibles según la marca seleccionada y adaptarlas para react-select
    if (Marca) {
      const models = [
        ...new Set(
          ListCar.filter(car => car.Sale.CarDetails.Brand === Marca.value)
            .map(car => car.Sale.CarDetails.Model)
        ),
      ].map(model => ({
        value: model,
        label: model,
      }));
      setAvailableModels(models);
    } else {
      setAvailableModels([]);
    }
  }, [ListCar, Marca]);

  const handleTodo = () => {
    setTodos(true);
    setNuevo(false);
    setUsado(false);
  };

  const handleNuevo = () => {
    setTodos(false);
    setNuevo(true);
    setUsado(false);
  };

  const handleUsado = () => {
    setTodos(false);
    setNuevo(false);
    setUsado(true);
  };

  const handleSearch = () => {
    const Options = {
      search: Search,
      YearDesde: YearDesde,
      YearHasta: YearHasta,
      marca: Marca,
      modelo: Modelo,
      rangoPrice: values,
    };

    console.log(Options);
    console.log("Todo: " + Todos);
    console.log("Nuevo: " + Nuevo);
    console.log("Usado: " + Usado);

    let Status = Todos ? 'Todo' : Nuevo ? 'Nuevo' : 'Usado';
    console.log(Status);
    // handleSearching(Status, Options);
  };

  const optionsYear = Array.from({ length: 50 }, (_, i) => {
    const year = new Date().getFullYear() + 1 - i;
    return { value: year.toString(), label: year.toString() };
  });

  const handleYearDesdeChange = (selectedOption) => {
    setYearDesde(selectedOption);
    if (YearHasta && selectedOption && parseInt(selectedOption.value) > parseInt(YearHasta.value)) {
      setYearHasta(selectedOption);
    }
  };

  const handleYearHastaChange = (selectedOption) => {
    setYearHasta(selectedOption);
    if (YearDesde && selectedOption && parseInt(selectedOption.value) < parseInt(YearDesde.value)) {
      setYearDesde(selectedOption);
    }
  };

  console.log(availableBrands);
  console.log(availableModels);

  return (
    <div className="flex flex-col justify-center mt-8 p-6 bg-gray-900 rounded max-md:px-5 max-md:max-w-full">
      <div className="w-full justify-center flex gap-10 self-center max-w-full text-sky-600 whitespace-nowrap">
        <button
          onClick={handleTodo}
          className={`${Todos ? 'border-b border-sky-600' : 'text-sky-600 opacity-55'} flex flex-col text-center text-[1.2rem] md:px-5`}>
          Todos
        </button>
        <button
          onClick={handleNuevo}
          className={`${Nuevo ? 'border-b border-sky-600' : 'text-sky-600 opacity-55'} flex flex-col text-center text-[1.2rem] md:px-5`}>
          Nuevos
        </button>
        <button
          onClick={handleUsado}
          className={`${Usado ? 'border-b border-sky-600' : 'text-sky-600 opacity-55'} flex flex-col text-center text-[1.2rem] md:px-5`}>
          Usados
        </button>
      </div>

      <div className="bg-transparent flex gap-5 justify-between items-start mt-6 text-sm font-semibold text-white whitespace-nowrap max-md:flex-wrap">
        <div className="relative bg-transparent w-full border border-[#004A77] rounded-lg">
          <div className="bg-transparent absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="bg-transparent w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input onChange={(e) => setSearch(e.target.value)} type="search" id="simple-search" className="bg-gray-50 border  transition-all border-[#004A77] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 w-full dark:bg-[#12232E] dark:border-[#12232E] dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar" required />
        </div>

        <div className="flex w-full gap-5">
          <div className="w-full">
            <div className='bg-gray-700 rounded'>
              <SelectL
                value={Marca}
                onChange={setMarca}
                options={availableBrands}
                isClearable
                placeholder="Selecciona"
              />
            </div>
          </div>

          <div className="w-full">
            <div className='bg-gray-700 rounded'>
              <SelectL
                value={Modelo}
                onChange={setModelo}
                options={availableModels}
                isClearable
                placeholder="Selecciona"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-transparent flex gap-5 justify-between items-start mt-4 max-md:flex-wrap">
        <div className="relative bg-transparent w-full md:w-[12rem] lg:w-full">
          <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Desde</label>
          <SelectL
            value={YearDesde}
            onChange={handleYearDesdeChange}
            options={optionsYear}
            isClearable
            placeholder="Selecciona"
          />
        </div>

        <div className="relative bg-transparent w-full md:w-[12rem] lg:w-full">
          <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hasta</label>
          <SelectL
            value={YearHasta}
            onChange={handleYearHastaChange}
            options={optionsYear}
            isClearable
            placeholder="Selecciona"
          />
        </div>

        <div className="bg-transparent w-full md:flex gap-4 justify-start py-0.5 max-md:flex-wrap md:max-w-full">
          <div className="bg-transparent flex flex-col text-white md:w-60 lg:w-full md:text-center">
            <div className="text-lg font-semibold bg-transparent">Rango precio</div>
            <div className="mt-1.5 text-sm font-medium bg-transparent md:text-[0.8rem] lg:text-[1rem]">
              ${values[0].toLocaleString()} - ${values[1].toLocaleString()}
            </div>
          </div>

          <div className='relative flex bg-transparent cursor-pointer w-full md:w-full lg:w-full mt-5 mb-5'>
            <Range
              step={1}
              min={min}
              max={max}
              values={values}
              onChange={(values) => setValues(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="absolute bg-gray-700 items-center top-0 bottom-0 h-4 md:h-2 m-auto w-full text-center"
                  style={{ ...props.style }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="shrink-0 w-6 h-6 bg-blue-400 rounded-full"
                  style={{ ...props.style }}
                />
              )}
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="justify-center px-16 py-4 text-base font-semibold text-center text-white whitespace-nowrap bg-sky-600 rounded max-md:px-5">
          Buscar
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
