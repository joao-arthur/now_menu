import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { Field } from "@/components/Field/Field";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import {
    Button,
    FlexContainer,
    FlexContent,
    Padding,
    Subtitle,
    Title,
} from "@/components/Layout";
import { Form } from "@/components/Form/Form";
import {
    TableAPI,
    useGetTables,
    usePostTable,
} from "@/api/table.api";
import { TableItem } from "./TableItem/TableItem";
import styled from "styled-components";

export const ListContainer = styled.div`
    overflow: auto;
`;

export function TablesRegister() {
    const editing = window.location.pathname.includes("edit");
    const [numberOfTables, setNumberOfTables] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [currentTables, setCurrentTables] = useState<TableAPI[]>(
        [],
    );
    const validForm = !!Number(numberOfTables);
    const {
        data: tables,
        mutate: mutateGetTables,
        isPending: isPendingGet,
    } = useGetTables();
    const {
        isPending: isLoadingPost,
        mutate: mutatePostTables,
        isSuccess: isSuccessPostTables,
    } = usePostTable(
        new Array(Number(numberOfTables)).fill("").map((
            _,
            index,
        ) => ({
            name: `Mesa ${index + 1 + (tables?.length || 0)}`,
        })),
    );

    useEffect(() => {
        if (tables) setCurrentTables(tables);
    }, [tables]);

    useEffect(() => {
        mutateGetTables();
    }, []);

    useEffect(() => {
        if (isSuccessPostTables) {
            mutateGetTables();
            setNumberOfTables("");
        }
    }, [isSuccessPostTables]);

    function submit() {
        if (!validForm) return;
        mutatePostTables();
    }

    if (shouldRedirect) redirect("/qrcode");

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader
                    showSkipLink={!editing}
                    goBackLink={editing ? "/profile" : undefined}
                />
                <Title>
                    {editing ? "Editar mesas" : "Cadastrar mesas"}
                </Title>
                <Subtitle>Por favor preencha para continuar</Subtitle>
                {currentTables && currentTables.length
                    ? (
                        <ListContainer>
                            {currentTables.map((table, index) => (
                                <TableItem
                                    table={table}
                                    key={table._id}
                                    isLastItem={index ===
                                        currentTables.length - 1}
                                    onRemove={() => mutateGetTables()}
                                />
                            ))}
                        </ListContainer>
                    )
                    : null}
                <Form onSubmit={submit}>
                    <Field
                        name="numberoftables"
                        title="quantas mesas quer adicionar?"
                        type="number"
                        min={0}
                        required
                        value={numberOfTables}
                        onChange={setNumberOfTables}
                        disabled={isLoadingPost || isPendingGet}
                    />
                    <Button
                        disabled={!validForm || isLoadingPost ||
                            isPendingGet}
                    >
                        Adicionar
                    </Button>
                </Form>
                <Button
                    onClick={() => setShouldRedirect(true)}
                    disabled={!currentTables?.length}
                >
                    Visualizar QR Codes
                </Button>
                <Padding />
            </FlexContent>
        </FlexContainer>
    );
}
