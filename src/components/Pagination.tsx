import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Pagination = ({ totalPages, currentPage, onPageChange }: any) => {
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          onPress={() => onPageChange(i)}
          style={{
            padding: 8,
            backgroundColor: currentPage === i ? 'gray' : 'transparent',
            borderRadius: 4,
            margin: 4,
          }}
        >
          <Text style={{ color: currentPage === i ? 'white' : 'black',  fontSize: 18 }}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return pages;
  };

  return (
    <View style={{ 
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
        disabled={currentPage === 1}
        style={{ padding: 8 }}
      >
        <Text style={{ color: currentPage === 1 ? 'gray' : 'black', fontSize: 18 }}>Anterior</Text>
      </TouchableOpacity>

      {renderPagination()}

      <TouchableOpacity
        onPress={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
        disabled={currentPage === totalPages}
        style={{ padding: 8 }}
      >
        <Text style={{ color: currentPage === totalPages ? 'gray' : 'black', fontSize: 18 }}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
