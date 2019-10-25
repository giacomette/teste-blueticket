import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  it('Deve permitir escrever uma busca', () => {
    const searchValue = 'Rua das andorinhas, 14';
    const component = mount(<SearchInput value={searchValue} />);

    const inputValue = component.find('input');

    expect(inputValue.props().value).toBe(searchValue);
  });

  it('Deve permitir selecionar um histórico de busca', () => {
    const searchValue = 'Rua das andorinhas, 14';
    const component = mount(<SearchInput value={searchValue} />);

    const newSearchValue = 'Avenida Beira mar, 540';

    component.setProps({
      value: newSearchValue
    });

    component.update();

    const inputValue = component.find('input');

    expect(inputValue.props().value).toBe(newSearchValue);
  });

  it('Deve preservar o estado do componente ao clicar para realizar a busca', () => {
    const component = renderer.create(<SearchInput />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Não deve permitir realizar uma busca sem informar um valor', () => {});
});
