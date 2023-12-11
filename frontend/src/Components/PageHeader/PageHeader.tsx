import { Container, Link } from "./PageHeader.styles";

type props = {
    goBackLink?: string;
    showSkipLink?: boolean;
};

export function PageHeader({ goBackLink, showSkipLink }: props) {
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
