import { SafeAreaView, Text, View, TextInput, FlatList, TouchableOpacity, Keyboard, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { supabase } from "./services/supabase";
import styles from "./styles/style";

interface Livro {
  id: string;
  books: string;
  completed: boolean;
}

export default function App() {
  const [novoLivro, setNovoLivro] = useState("");
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("books").select("*").order("id", { ascending: true });
      if (error) throw error;
      setLivros(data ?? []);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      Alert.alert("Erro", "Não foi possível buscar a lista de livros.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (titulo: string) => {
    if (!titulo.trim()) return;
    Keyboard.dismiss();

    try {
      setLoading(true);
      const { error } = await supabase
        .from("books")
        .insert([{ books: titulo, completed: false }]);
      if (error) throw error;
      await fetchBooks();
      setNovoLivro("");
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      Alert.alert("Erro", "Não foi possível adicionar o livro.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) throw error;
      await fetchBooks();
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
      Alert.alert("Erro", "Não foi possível deletar o livro.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCompleted = async (id: string, completed: boolean) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("books")
        .update({ completed })
        .eq("id", id);
      if (error) throw error;
      await fetchBooks();
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      Alert.alert("Erro", "Não foi possível atualizar o status do livro.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={[styles.bookTitle, item.completed && styles.lido]}>
        {item.books}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleToggleCompleted(item.id, !item.completed)}>
          {item.completed ? (
            <Feather name="check-circle" size={22} color="#69ff52ff" style={{ marginRight: 15 }} />
          ) : (
            <Feather name="book" size={22} color="#e5d9fdff" style={{ marginRight: 15 }} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteBook(item.id)}>
          <Feather name="trash-2" size={22} color="#ff5c5c" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Leitura</Text>
        <Feather name="book-open" style={ styles.title } color="#e5d9fdff" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do livro"
          placeholderTextColor="#aaa"
          value={novoLivro}
          onChangeText={setNovoLivro}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddBook(novoLivro)}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={livros}
        keyExtractor={item => item.id}
        onRefresh={fetchBooks}
        refreshing={loading}
        renderItem={renderBookItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </SafeAreaView>
  );
}