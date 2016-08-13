from pogospotted.app import create_pokemons_list
import pytest

NUMBER_OF_POKEMON = 151

@pytest.fixture()
def pokemons():
    return create_pokemons_list()

def test_create_pokemons_list_not_empty(pokemons):
    assert pokemons != ()

def test_has_all_pokemons(pokemons):
    assert len(pokemons) == NUMBER_OF_POKEMON
