import { Center, Heading, ScrollView, VStack } from "native-base";
import {Text } from "react-native"
import { Input } from "../components/Input";
import { Controller } from "react-hook-form";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { SignIn } from "./SignIn";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";





export function RecoverPassword () {
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [codigo, setCodigo] = useState('');
    const [senha, setSenha] = useState('');
    
    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    
    const gerarCodigo = async () => {
        try {
            const {data}=await api.post('/redefinir-senha', {email});
            setMensagem(data.mensagem);
            alert("email enviando com sucesso")
        } catch (error) {
            setMensagem('Erro ao gerar o código de recuperação.');
        }
    };

    const  atualizarSenha = async () => {
        try {
            const {data}=await api.post('/redefinir-senha', {email, codigo, senha});
            setMensagem(data.mensagem);
            alert("Redefinição de senha concluida")
            navigation.navigate('signIn');
        } catch (error) {
            setMensagem('Erro ao atualizar a senha.');
        }
    };


    return (

        <ScrollView flex={1} pb={6} p={8}>

            <VStack flex={1} m={20} justifyContent="center" alignItems="center" h={400} pb={8}>
    
                <Center m={10} pb={5} p={5} h={120} w={80}>
                   <Heading pb={4}>Recuperação de senha </Heading>
                    <Input
                        placeholder="E-mail"
                        bg="gray.500"
                        color="gray.100"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
    
                    />
                     <Button
                        Color="gray.500"
                        title="Gerar código" onPress={gerarCodigo}
                        m={3}
                     ></Button>

                     <Input
                        placeholder="Codigo"
                        bg="gray.500"
                        color="gray.100"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={codigo}
                        onChangeText={(text) =>  setCodigo(text)}
                    />

                     <Input
                        placeholder="Nova senha"
                        bg="gray.500"
                        color="gray.100"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                    />
                    <Button
                      m={4}
                      color="black"
                      title="Salvar alterações"
                      onPress={atualizarSenha}
                    ></Button>
                </Center>
    
            </VStack>

        </ScrollView>
        )
    }
function setIsLoading(arg0: boolean) {
    throw new Error("Function not implemented.");
}

