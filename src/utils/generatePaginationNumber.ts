
// [1,2,3,4,...,7]

export const generatePaginationNumbers = (totalPages: number, currentPage: number) => {

    //* si el número total de paginas es 7 o menos, simplemente devolvemos un array con los números de las páginas
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    //* si la pagina actual está entre las primeras 3 páginas mostrar las primeras 3, ..., y las ultimas 2

    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    //* si la pagina actual está entre las páginas 4 y 6 mostrar las primeras 2, ..., y las ultimas 3
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    //* si la pagina actual está otro lugar medio
    //* mostrar la priemra pagina, ..., actual y vecinas
    return [
        1, 
        '...', 
        currentPage - 1, 
        currentPage, 
        currentPage + 1, 
        '...', 
        totalPages
    ]
}