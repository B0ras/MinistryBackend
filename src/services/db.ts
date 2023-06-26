import User from '../models/user';
import supabase from "./supabase";


export async function insert(obj, table: string) {
    const { data, error } = await supabase
        .from(table)
        .insert(obj)
        .select();

    if (error) throw error

    return data[0]
}


export async function select_all(table: string, parameters?: string) {
    const { data, error } = await supabase
        .from(table)
        .select(parameters)

    if (error) throw error
    return data;
}

export async function selectById(id: number, table: string, parameters?: string) {
    const { data, error } = await supabase
        .from(table)
        .select(parameters)
        .eq("id", id)

    if (error) throw error
    return data;
}

export async function selectByUsername(username: string, table: string) {
    const { data, error } = await supabase
        .from(table)
        .select()
        .eq("username", username)
        .returns<User>()

    if (error) throw error
    return data[0];
}

export async function update(id: number, obj, table: string) {
    const { data, error } = await supabase
        .from(table)
        .update(obj)
        .eq("id", id)
        .select()

    if (error) throw error
    return data
}

export async function remove(id: number, table: string) {
    const { data } = await supabase
        .from(table)
        .delete()
        .eq("id", id)
        .select()
    if (data) return data[0]
}
