import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Field } from "../../Components/Field/Field";
import { PageHeader } from "../../Components/PageHeader/PageHeader";
import {
    Button,
    FlexContainer,
    FlexContent,
    Padding,
    Subtitle,
    Title,
} from "../../Components/Layout";
import { Form } from "../../Components/Form/Form";
import {
    tableAPI,
    useGetTables,
    usePostTable,
} from "../../Api/table.api";
import { TableItem } from "./TableItem/TableItem";
import { ListContainer } from "./Register.styles";

export function TablesRegister() {
    const editing = window.location.pathname.includes("edit");
    const [numberOfTables, setNumberOfTables] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [currentTables, setCurrentTables] = useState<tableAPI[]>(
        [],
    );
    const validForm = !!Number(numberOfTables);
    const {
        data: tables,
        mutate: mutateGetTables,
        isLoading: isLoadingGet,
    } = useGetTables();
    const {
        isLoading: isLoadingPost,
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

    if (shouldRedirect) return <Redirect to="/qrcode" />;
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
                        disabled={isLoadingPost || isLoadingGet}
                    />
                    <Button
                        disabled={!validForm || isLoadingPost ||
                            isLoadingGet}
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
