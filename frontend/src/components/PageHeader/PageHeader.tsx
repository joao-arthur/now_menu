import styled from "styled-components";
import { Link as BaseLink } from "../Layout";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 3rem;
`;

export const Link = styled(BaseLink)`
    font-size: 0.8rem;
`;


type Props = {
    readonly goBackLink?: string;
    readonly showSkipLink?: boolean;
};

export function PageHeader({ goBackLink, showSkipLink }: Props) {
    return (
        <Container>
            <div>
                {goBackLink
                    ? <Link to={goBackLink}>voltar</Link>
                    : null}
            </div>
            <div>
                {showSkipLink ? <Link to="/">pular</Link> : null}
            </div>
        </Container>
    );
}
